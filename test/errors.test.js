var firstdata = require('../')
  , FirstDataClient = firstdata.Client
  , config = require('./config.json')
  , client = new FirstDataClient(config)
  , gateway_response = firstdata.codes.gateway
  , bank_response = firstdata.codes.bank;


describe('Connection Errors', function(){

  it('should handle network errors', function(done){
    var lostclient = new FirstDataClient(config);
    lostclient.host = 'bad.' + client.host;

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

  it('should report invalid date', function(){
    // 'Date header is invalid. Not within 15 minutes of present time: Sun Jul 13 09:31:48 UTC 2014. Expected 1405243908 plus/minus 300, but received 2014-07-11 09:31:48 UTC.'
  })

});
