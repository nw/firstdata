
var firstdata = require('../')
  , FirstDataClient = firstdata.Client
  , config = require('./config.json')
  , client = new FirstDataClient(config)
  , gateway_response = firstdata.codes.gateway
  , bank_response = firstdata.codes.bank
  , cvv = firstdata.codes.cvv
  , amount = 10;

// https://firstdata.zendesk.com/entries/407655-How-to-test-CVD-CVV-CVV2-functionality
// we can only test 1-6 in {3} digits
// 034, 794, 963 all fail would expect 'I' (no cvv2 in response)
// however 03, 79, 96 all respond with cvv2 = 'I'
var validate = ['M', 'N', 'P', 'S', 'U', 'I'];


describe('CVD/CVV/CVV2 Responses', function(){


  validate.forEach(function(code, idx){

    it('should produce cvv code ('+code+') - '+ cvv[code], function(done){
      client.purchase({
        amount: amount++
      , cardholder_name: 'John Doe'
      , cc_number: '4111111111111111'
      , cc_expiry: "0519"
      , cvd_presence_ind: 1
      , cc_verification_str2: (idx + 1) + '43'
      , some_random_ugly_prop: "cool"
      }, function(err, resp){
        resp.should.be.ok;
        resp.isApproved().should.be.ok;
        resp.gateway.code.should.eql("00");
        resp.bank.code.should.equal("100");

        resp.data.cvv2.should.eql(code);

        done(err);
      });

    })

  });


});
