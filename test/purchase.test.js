var FirstDataClient = require('../').Client
  , config = require('./config.json')
  , client = new FirstDataClient(config);


describe('Purchase', function(){
  
  it('should approve with minimum params', function(done){
    client.purchase({
      amount: 39.14
    , cardholder_name: 'John Doe'
    , cc_number: '4111111111111111'
    , cc_expiry: "0519"
    }, function(err, resp){
      //console.log(resp)
      resp.isApproved().should.be.ok;
      resp.isError().should.be.not.ok;
      resp.data.bank_resp_code.should.eql("100");
      resp.data.bank_message.should.eql("Approved");
      done(resp.error);
    });
  })
  
})