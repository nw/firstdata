
// Testing Bank Responses
// see: https://firstdata.zendesk.com/entries/407657-How-to-generate-unsuccessful-transactions-during-testing-

var firstdata = require('../')
  , FirstDataClient = firstdata.Client
  , config = require('./config.json')
  , client = new FirstDataClient(config)
  , gateway_response = firstdata.codes.gateway
  , bank_response = firstdata.codes.bank;

describe('Bank Responses', function(){

  describe('Successful', function() {
    Object.keys(bank_response).forEach(function(code){
      if(bank_response[code].type !== 'S') return;
      if(code === '100') return; // returns approved unlike the rest and is tested throughout.

      it('should return a successful response ('+code+') - ' + bank_response[code].name, function(done) {
          client.purchase({
            amount: '5' + code
          , cardholder_name: 'John Doe'
          , cc_number: '4111111111111111'
          , cc_expiry: "0519"
          }, function(err, resp){

            resp.isApproved().should.not.be.ok;
            resp.isSuccessful().should.be.ok;
            resp.isError().should.not.be.ok;

            resp.gateway.code.should.eql("00");

            resp.statusCode.should.be.below(400);
            resp.headers.status.should.be.below(400);

            resp.bank.code.should.eql(code);

            resp.data.bank_resp_code.should.eql(code);
            // disabling for now
            resp.data.bank_message.should.eql(bank_response[code].name)

            done();
          });
      })

    })
  })

  describe('Errors', function(){
      Object.keys(bank_response).forEach(function(code){

        if(code === '000' || bank_response[code].type === 'S') return;

        it('should handle response error ('+code+') - ' + bank_response[code].name, function(done){
            client.purchase({
              amount: '5' + code
            , cardholder_name: 'John Doe'
            , cc_number: '4111111111111111'
            , cc_expiry: "0519"
            }, function(err, resp){

              err.should.be.an.instanceOf(Error);
              err.code.should.eql(code)
              resp.isApproved().should.not.be.ok;
              resp.isSuccessful().should.not.be.ok;
              resp.isError().should.be.ok;

              resp.gateway.code.should.eql("00");

              resp.statusCode.should.be.below(400);
              resp.headers.status.should.be.below(400);

              resp.bank.code.should.eql(code);

              resp.data.bank_resp_code.should.eql(code);
              // disabling for now
              resp.data.bank_message.should.eql(bank_response[code].actual || bank_response[code].name)

              done();
            });

          })


      });
  });

});
