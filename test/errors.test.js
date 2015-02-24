var firstdata = require('../')
  , FirstDataClient = firstdata.Client
  , FirstDataResponse = firstdata.Response
  , config = require('./config.json')
  , utils = firstdata.utils
  , gateway_response = firstdata.codes.gateway
  , bank_response = firstdata.codes.bank;


describe('Connection Errors', function(){

  it('should handle network errors', function(done){
    var lostclient = new FirstDataClient(config);
    lostclient.host = 'bad.' + lostclient.host;

    lostclient.purchase({
      amount: 39.14
    , cardholder_name: 'John Doe'
    , cc_number: '4111111111111111'
    , cc_expiry: "0519"
    }, function(err, resp){
      err.should.be.ok;
      err.code.should.eql('ENOTFOUND')
      resp.isApproved().should.not.be.ok;
      resp.isSuccessful().should.not.be.ok;
      resp.isError().should.be.ok;

      resp.gateway.code.should.eql('40');
      resp.gateway.message.should.eql('Unable to Connect');

      resp.bank.code.should.eql('000');
      resp.bank.name.should.eql('No Answer');

      done();
    });
  });

  it('should report invalid authentication', function(done){
    var badclient = new FirstDataClient(config);
    badclient.options.hmac = "BAD";

    badclient.purchase({
      amount: 39.14
    , cardholder_name: 'John Doe'
    , cc_number: '4111111111111111'
    , cc_expiry: "0519"
    }, function(err, resp){

      err.should.be.ok;
      err.code.should.eql('-1')
      resp.isApproved().should.not.be.ok;
      resp.isSuccessful().should.not.be.ok;
      resp.isError().should.be.ok;

      resp.gateway.code.should.eql('-1');
      // 'Invalid signature received \'R6IM+8############\'.',
      resp.gateway.message.should.eql('Invalid signature received');

      resp.bank.code.should.eql('000');
      resp.bank.name.should.eql('No Answer');

      done();
    });
  });

  it('should report invalid date header', function(done){
    var client = new FirstDataClient(config);
    var data = {
      amount: 39.14
    , cardholder_name: 'John Doe'
    , cc_number: '4111111111111111'
    , cc_expiry: "0519"
    };
    var d = new Date();
    d.setMinutes(d.getMinutes() + 20);

    var payload = JSON.stringify(utils.merge({transaction_type: '00'}, client.defaults, data))
      , uri = '/transaction/v14'
      , headers = utils.createSecureHeaders(payload, {
          hmac: client.options.hmac
        , key: client.options.key
        , uri: uri
        , time: d.toISOString().replace(/\.[0-9]{3}Z$/,'Z')
        });

        utils.request({
              hostname: client.host
            , path: uri
            , port: 443
            , method: 'POST'
            , headers: headers
          }, payload, function(err, resp) {

            var fdr = new FirstDataResponse(err, headers, payload, resp);

             fdr.statusCode.should.be.above(400);
             fdr.error.should.be.ok;
             fdr.gateway.code.should.eql('-2');

            done();

        });


    // 'Date header is invalid. Not within 15 minutes of present time: Sun Jul 13 09:31:48 UTC 2014. Expected 1405243908 plus/minus 300, but received 2014-07-11 09:31:48 UTC.'
  })

  it('should report bad date format', function(done){
    var client = new FirstDataClient(config);
    var data = {
      amount: 39.14
    , cardholder_name: 'John Doe'
    , cc_number: '4111111111111111'
    , cc_expiry: "0519"
    };

    var payload = JSON.stringify(utils.merge({transaction_type: '00'}, client.defaults, data))
      , uri = '/transaction/v14'
      , headers = utils.createSecureHeaders(payload, {
          hmac: client.options.hmac
        , key: client.options.key
        , uri: uri
        , time: new Date()});

        utils.request({
              hostname: client.host
            , path: uri
            , port: 443
            , method: 'POST'
            , headers: headers
          }, payload, function(err, resp) {

            var fdr = new FirstDataResponse(err, headers, payload, resp);
console.log(fdr)
             fdr.statusCode.should.be.above(400);
             fdr.error.should.be.ok;
             fdr.gateway.code.should.eql('-3');

            done();

        });


    // 'Date header is invalid. Not within 15 minutes of present time: Sun Jul 13 09:31:48 UTC 2014. Expected 1405243908 plus/minus 300, but received 2014-07-11 09:31:48 UTC.'
  })

});
