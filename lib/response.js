var response_codes = require('./codes/gateway_response')
  , bank_codes = require('./codes/bank_response')
  , ResponseError = require('./error').ResponseError
  , BankError = require('./error').BankError;

function FirstDataResponse(error, headers, sent, resp){
  resp = resp || {};
  
  this.req_headers = headers;
  this.sent = sent;

  this.headers = resp.headers || {};
  this.raw = resp.text || '';
  this.data = resp.body || {};

  this.code = this.data.exact_resp_code 
    || (this.raw.match(/\(([F,0-9]{2})\)/) || [])[1] // header.status >= 400 has no data resp, must parse
    || '40';
  this.status = response_codes[this.code];
  
  this.bank_code = this.data.bank_resp_code || '000';
  this.bank_status = bank_codes[this.bank_code] || {};

  this.error = (!error && this.code !== '00')
    ? new ResponseError(this.code, this.status)
    : (!error && !this.isSuccessful())
        ? new BankError(this.bank_code, this.bank_status)
        : error;
}

FirstDataResponse.prototype = {
  
  isApproved: function(){
    return (this.isSuccessful() && this.data.transaction_approved);
  },
  
  isSuccessful: function(){
    return (this.error || this.bank_status.type !== 'S') ? false : true;
  },
  
  getMessage: function(){
    
  },
  
  isError: function(){
    return !!this.error;
  }
  
};

module.exports = FirstDataResponse;
