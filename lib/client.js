
var FirstDataResponse = require('./response')
  , transactions = require('./codes').transactions
  , utils = require('./utils')
  , merge = utils.merge
  , createSecureHeaders = utils.createSecureHeaders
  , request = utils.request;

module.exports = FirstData;

function FirstData(options, defaults){

  this.options = merge({timeout: 1000 * 3}, options);

  var subdomain = 'api.' + ((this.options.sandbox) ? 'demo.' : '');

  this.defaults = merge({
    gateway_id: this.options.gateway_id
  , password: this.options.password
  }, defaults);

  if(this.options.name) this.defaults.user_name = this.options.name;

  if(!this.options.admin) this.options.admin = {};
  if(!this.options.admin.version) this.options.admin.version = 3;

  this.host = subdomain + 'globalgatewaye4.firstdata.com';
}

FirstData.prototype = {

  send: function(type, data, callback) {

    var payload = JSON.stringify(merge({transaction_type: type}, this.defaults, data))
      , uri = '/transaction/v' + (this.options.version || 14)
      , headers = createSecureHeaders(payload, {
          hmac: this.options.hmac
        , key: this.options.key
        , uri: uri });

    request({
          hostname: this.host
        , path: uri
        , port: 443
        , method: 'POST'
        , headers: headers
      }, payload, function(err, resp) {

        if(!err) { // only attempt to parse JSON if there is no error.
          try {
            var text = resp.text && resp.text.replace(/^\s*|\s*$/g, '');
            resp.body = text && JSON.parse(text);
          } catch(e) {}
        }

        var fdr = new FirstDataResponse(err, headers, payload, resp);
        return callback(fdr.error, fdr);
    });

  },

  search: function(filter, callback) {
    var admin_opts = this.options.admin
      , auth = "Basic "+ new Buffer(admin_opts.username + ':' + admin_opts.user).toString('base64');

    if(typeof filter === 'function'){
      callback = filter;
      filter = {};
    }

    request({
          hostname: this.host
        , path: '/transaction/search'
        , port: 443
        , method: 'GET'
        , headers: {
            Authorization: auth
          , Accept: 'text/search-v'+ (admin_opts.version) +'csv'
        }
      }, filter, function(err, resp) {

    });

  },

  report: function() {

  }

}


Object.keys(transactions).forEach(function(code){
  FirstData.prototype[transactions[code]] = function(data, callback){
    this.send(code, data, callback);
  }
});
