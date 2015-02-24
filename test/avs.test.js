var firstdata = require('../')
  , FirstDataClient = firstdata.Client
  , merge = firstdata.utils.merge
  , config = require('./config.json')
  , avs = firstdata.codes.avs;

// https://firstdata.zendesk.com/entries/23872458-How-to-test-AVS-Response-Codes-in-Demo
// DISABLED: 9, F,I,M,P all International codes that fail in testing!
var validate = '12345678ABCDEGNPQRSUWXYZ'.split('');

describe('AVS Responses', function(){


  describe('versions 12 & 13', function() {

      var client = new FirstDataClient(merge({}, config, {version: 13})); // revert to old api for test

      validate.forEach(function(code){

        it('should produce cvv code ('+code+') - '+ (avs[code] || "fake"), function(done){
          client.purchase({
            amount: 20
          , cardholder_name: 'John Doe'
          , cc_number: '4111111111111111'
          , cc_expiry: "0519"
          , cvd_presence_ind: 1
          , cc_verification_str1: code + "123 Main St"
          }, function(err, resp){

            if(!avs[code]){
              resp.gateway.code.should.eql("31");
              err.code.should.eql("31");
              resp.bank_code.should.eql("000");
            } else {
        //      console.log(resp)
              resp.should.be.ok;
              resp.isApproved().should.be.ok;
              resp.gateway.code.should.eql("00");
              resp.bank.code.should.equal("100");

              resp.data.avs.should.eql(code);
            }
            done();
          });

        })

      });

  });


  describe('version 14', function(){

    var client = new FirstDataClient(merge({}, config, {version: 14})); // revert to old api for test

    validate.forEach(function(code){

      it('should produce cvv code ('+code+') - '+ (avs[code] || "fake"), function(done){
        client.purchase({
          amount: 20
        , cardholder_name: 'John Doe'
        , cc_number: '4111111111111111'
        , cc_expiry: "0519"
        , cvd_presence_ind: 1
        , address: {
            address1: code +'123 Main St.'
          , address2: ''
          , city: 'Springfield'
          , state: 'IL'
          , zip: '42631'
          , country_code: 'US'
          , phone_number: '555-555-5555'
          , phone_type: 'D' // H = Home, W = Work, D = Day, N = Night
          }
        }, function(err, resp){

          if(!avs[code]){
            resp.gateway.code.should.eql("31");
            err.code.should.eql("31");
            resp.bank.code.should.eql("000");
          } else {
            //console.log(resp)
            resp.should.be.ok;
            resp.isApproved().should.be.ok;
            resp.gateway.code.should.eql("00");
            resp.bank.code.should.equal("100");

            resp.data.avs.should.eql(code);
          }
          done();
        });

      })

    });


  });



});
