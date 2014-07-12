var response_codes = require('./codes/gateway_response')
  , bank_codes = require('./codes/bank_response');

function FirstDataResponse(error, resp){
  
  this.approved = false;
  
  this.headers = {};
  this.data = {};
  
  if(error && !resp){
    return this.error = error;
  }
  
  
  this.headers = resp.headers || {};
  this.data = resp.body;

  if(this.headers.status >= 400){
    var code = resp.text.match(/\(([F,0-9]{2})\)/);
    this.code = (code) ? code[0] : '-1';
    this.error = new Error(response_codes[this.code]);
    this.error.code = this.code;
  } else {
    this.code = this.data.exact_resp_code;
    if(this.code !== '00'){
      this.error = new Error(response_codes[this.code]);
      this.error.code = this.code;
    } else {
      this.bank_code = this.data.bank_resp_code;
    }
  }

}

FirstDataResponse.prototype = {
  
  isApproved: function(){
    if(this.error) return false;
    return !!this.data.transaction_approved;
  },
  
  isError: function(){
    return !!this.error;
  },
  
  validate: function(){
    
  }
  
};

module.exports = FirstDataResponse;
