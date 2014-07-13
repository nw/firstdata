var firstdata = require('../')
  , FirstDataClient = firstdata.Client
  , config = require('./config.json')
  , client = new FirstDataClient(config)
  , gateway_response = firstdata.codes.gateway
  , bank_response = firstdata.codes.bank
  , avs = firstdata.codes.avs
  , amount = 20;


// DISABLED: F,I,M all International codes that fail in testing!
var validate = '12345678ABCDEGNPQRSUWXYZ'.split('');

describe('AVS Responses', function(){
  
  
  validate.forEach(function(code){
    
    it('should produce cvv code ('+code+') - '+ (avs[code] || "fake"), function(done){
      client.purchase({
        amount: amount++
      , cardholder_name: 'John Doe'
      , cc_number: '4111111111111111'
      , cc_expiry: "0519"
      , cvd_presence_ind: 1
      , cc_verification_str1: code + "123 Main St"
      // , cc_verification_str2: (idx + 1) + '43'
      }, function(err, resp){
        
        if(!avs[code]){
          //console.log(resp)
          resp.code.should.eql("31");
          err.code.should.eql("31");
          resp.bank_code.should.eql("000");
        } else {
          //console.log(resp)
          resp.should.be.ok;
          resp.isApproved().should.be.ok;
          resp.code.should.eql("00");
          resp.bank_code.should.equal("100");
    
          resp.data.avs.should.eql(code);
        }
        done();
      });
    
    })
    
  });
  
  // TODO: test v14 since it has a different signature
  
  
});