// Testing Gateway Responses
// see: https://firstdata.zendesk.com/entries/407657-How-to-generate-unsuccessful-transactions-during-testing-

var firstdata = require('../')
  , FirstDataClient = firstdata.Client
  , config = require('./config.json')
  , client = new FirstDataClient(config)
  , gateway_response = firstdata.codes.gateway
  , bank_response = firstdata.codes.bank;


describe('Gateway Errors', function(){

  Object.keys(gateway_response).forEach(function(code){
    if(code === '00' || code.match(/^[F-]/) ) return; // untestable

    it('should handle response error ('+code+') - '+ gateway_response[code], function(done){
      client.purchase({
        amount: '5000.' + code
      , cardholder_name: 'John Doe'
      , cc_number: '4111111111111111'
      , cc_expiry: "0519"
      }, function(err, resp){

        err.should.be.an.instanceOf(Error);
        err.code.should.eql(code)
        resp.isApproved().should.not.be.ok;
        resp.isSuccessful().should.not.be.ok;
        resp.isError().should.be.ok;

        resp.gateway.code.should.eql(code);
        resp.gateway.message.should.eql(gateway_response[code]);

        // if(resp.headers.status >= 400){
        //   //Server Error. Please contact Support. (43) - Invalid Logon
        //   //resp.status.should.eql( resp.raw.match(/- (.+?)$/)[1].trim() );
        // } else {
        //   resp.status.should.eql( resp.data.exact_message )
        // }


        resp.bank.code.should.eql('000');
        resp.bank.name.should.eql('No Answer');

        done();
      });

    })

  });


});
