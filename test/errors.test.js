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

      resp.code.should.eql('40');
      resp.status.should.eql('Unable to Connect');
      
      resp.bank_code.should.eql('000');
      resp.bank_status.name.should.eql('No Answer');

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

      resp.code.should.eql('-1');
      // 'Invalid signature received \'R6IM+8############\'.',
      resp.status.should.eql('Invalid signature received');
      
      resp.bank_code.should.eql('000');
      resp.bank_status.name.should.eql('No Answer');

      done();
    });
  });
  
  it('should report invalid date', function(){
    // 'Date header is invalid. Not within 15 minutes of present time: Sun Jul 13 09:31:48 UTC 2014. Expected 1405243908 plus/minus 300, but received 2014-07-11 09:31:48 UTC.'
  })
  
});

describe('Gateway Errors', function(){

  Object.keys(gateway_response).forEach(function(code){
    if(code === '00' || code.match(/^[F-]/)) return;

    it('should handle response error ('+code+') - '+ gateway_response[code], function(done){
      client.purchase({
        amount: '5000.' + code
      , cardholder_name: 'John Doe'
      , cc_number: '4111111111111111'
      , cc_expiry: "0519"
      }, function(err, resp){
        //console.log(code, resp.headers.status, Object.keys(resp.data).length, resp.data.exact_message);
        err.should.be.an.instanceOf(Error);
        err.code.should.eql(code)
        resp.isApproved().should.not.be.ok;
        resp.isSuccessful().should.not.be.ok;
        resp.isError().should.be.ok;

        resp.code.should.eql(code);
        resp.status.should.eql(gateway_response[code]);

        // if(resp.headers.status >= 400){
        //   //Server Error. Please contact Support. (43) - Invalid Logon
        //   //resp.status.should.eql( resp.raw.match(/- (.+?)$/)[1].trim() );
        // } else {
        //   resp.status.should.eql( resp.data.exact_message )
        // }


        resp.bank_code.should.eql('000');
        resp.bank_status.name.should.eql('No Answer');

        done();
      });

    })

  });


});


describe('Bank Response Errors', function(){
  
  Object.keys(bank_response).forEach(function(code){
    
    if(code === '000' || bank_response[code].type === 'S') return;
    
    it('should handle response error ('+code+') - ' + bank_response[code].name, function(done){
        client.purchase({
          amount: '5' + code
        , cardholder_name: 'John Doe'
        , cc_number: '4111111111111111'
        , cc_expiry: "0519"
        }, function(err, resp){
          //console.log(resp.data)
          err.should.be.an.instanceOf(Error);
          err.code.should.eql(code)
          resp.isApproved().should.not.be.ok;
          resp.isSuccessful().should.not.be.ok;
          resp.isError().should.be.ok;

          resp.code.should.eql("00");
          
          resp.headers.status.should.be.below(400);
          
          resp.bank_code.should.eql(code);
          
          resp.data.bank_resp_code.should.eql(code);
          // disabling for now
          //resp.data.bank_message.should.eql(bank_response[code].name)
          
          done();
        });
  
      })
      
      
  });
    
});
  