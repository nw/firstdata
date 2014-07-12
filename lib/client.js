var request = require('superagent')
  , crypto = require('crypto')
  , merge = require('./utils').merge
  , transaction_types = require('./transaction_types')
  , FirstDataResponse = require('./response');

module.exports = FirstData;


function FirstData(options, defaults){
  
  this.options = options || {};
  
  var subdomain = 'api.' + ((this.options.sandbox) ? 'demo.' : '');
  
  this.defaults = merge({
    gateway_id: this.options.gateway_id
  , password: this.options.password
  }, defaults);
  
  if(this.options.name) this.defaults.user_name = this.options.name;

  this.host = subdomain + 'globalgatewaye4.firstdata.com';  
  this.uri = '/transaction/v' + (this.options.version || 12);
  this.method = 'POST';
  this.content_type = 'application/json';
}


FirstData.prototype = {

  send: function(type, data, callback){
    var payload = JSON.stringify(merge({transaction_type: type}, this.defaults, data))  
      , digest = crypto.createHash("sha1").update(payload).digest('hex')
      , time = (new Date).toISOString().replace(/\.[0-9]{3}Z$/,'Z') // first data does not support fractional seconds
      , authcode = crypto.createHmac('sha1', this.options.hmac)
          .update([this.method, this.content_type, digest, time, this.uri].join("\n"))
          .digest('base64')
      , headers = {
          'Authorization': 'GGE4_API ' + this.options.key + ':' + authcode
        , 'X-GGe4-Date': time
        , 'X-GGe4-Content-SHA1': digest
        , 'Content-Type': this.content_type
        , 'Accept': this.content_type };
      
    request
      .post('https://'+ this.host + this.uri)
      .send(payload)
      .set(headers)
      .end(function(err, resp){
        var respObj = new FirstDataResponse(err, headers, payload, resp);
        callback(respObj.error, respObj);
      })
  }

}


Object.keys(transaction_types).forEach(function(type){
  FirstData.prototype[type] = function(data, callback){
    this.send(transaction_types[type], data, callback);
  }
});
