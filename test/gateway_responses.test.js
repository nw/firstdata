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
    if(code === '00'
      //  || parseInt(code) < 0
      // || code.indexOf('F') == -1
       || code.match(/^[F-]/)
      //  || code !== '13'
      ) return;

    it('should handle response error ('+code+') - '+ gateway_response[code], function(done){
      client.purchase({
        amount: '5000.' + code
      , cardholder_name: 'John Doe'
      , cc_number: '4111111111111111'
      , cc_expiry: "0519"
      }, function(err, resp){
        //if(resp.code == '40') console.log('code ', code)

//        return done();
//console.log(err, resp);
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
