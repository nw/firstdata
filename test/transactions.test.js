var firstdata = require('../')
  , FirstDataClient = firstdata.Client
  , config = require('./config.json')
  , client = new FirstDataClient(config)
  , gateway_response = firstdata.codes.gateway
  , bank_response = firstdata.codes.bank;


describe('Transactions', function(){

  var tag, token, auth;


  it('should preauth', function(done){

    client.preauth({
      amount: 5
    , cardholder_name: 'John Doe'
    , cc_number: '4111111111111111'
    , cc_expiry: "0519"
    }, function(err, resp){

        resp.isApproved().should.be.ok;

        resp.data.transarmor_token.should.be.ok;
        resp.data.authorization_num.should.be.ok;

        tag = resp.data.transaction_tag;
        token = resp.data.transarmor_token;
        auth = resp.data.authorization_num;

        done(err);
    });

  });

  it('should tagged pre-authorization completion', function(done){

    client.taggedPreauthComplete({
      amount: 5
    , transaction_tag: tag
    , authorization_num: auth
    }, function(err, resp){
      resp.isApproved().should.be.ok;

      tag = resp.data.transaction_tag;
      token = resp.data.transarmor_token;
      auth = resp.data.authorization_num;

      done(err);
    })

  });

  it('should tagged refund', function(done){

    client.taggedRefund({
      amount: 4
    , transaction_tag: tag
    , authorization_num: auth
    }, function(err, resp){
      resp.isApproved().should.be.ok;

      tag = resp.data.transaction_tag;
      token = resp.data.transarmor_token;
      auth = resp.data.authorization_num;

      done(err);
    });

  });



})
