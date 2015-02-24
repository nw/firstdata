var utils = require('./utils')
  , response_codes = require('./codes/gateway_response')
  , bank_codes = require('./codes/bank_response')
  , ResponseError = require('./errors').ResponseError
  , BankError = require('./errors').BankError;

function FirstDataResponse(error, headers, payload, resp){
  resp = resp || {};

  this.req_headers = headers;
  this.payload = payload;

  this.statusCode = resp.statusCode; // HTTP response code
  this.headers = resp.headers || {};
  this.raw = resp.text || '';
  this.data = resp.body || {};
  this.gateway = {};
  this.bank = {};

  if(this.headers.status >= 400){
    if(this.raw.match(/Invalid signature received/)) this.gateway.code = '-1';
    else if(this.raw.match(/Date header is invalid/)) this.gateway.code = '-2';
    else this.gateway.code = (this.raw.match(/\(([F,0-9]{2})\)/) || [])[1];
  }

  if(!this.gateway.code) this.gateway.code = this.data.exact_resp_code || '40';
  this.gateway.message = response_codes[this.gateway.code];

  this.bank.code = this.data.bank_resp_code || '000';
  utils.merge(this.bank, bank_codes[this.bank.code]);

  this.error = (!error && this.gateway.code !== '00')
    ? new ResponseError(this.gateway)
    : (!error && !this.isSuccessful())
        ? new BankError(this.bank)
        : error;

  utils.deepFreeze(this);

  return this;
}

FirstDataResponse.prototype = {

  isApproved: function(){
    return (this.isSuccessful() && this.data.transaction_approved);
  },

  isSuccessful: function(){
    return (this.error || this.bank.type !== 'S') ? false : true;
  },

  isError: function(){
    return !!this.error;
  }

};

module.exports = FirstDataResponse;
