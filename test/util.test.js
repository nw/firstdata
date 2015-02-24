var fs = require('fs')
  , libxml = require('libxmljs')
  , should = require('should')
  , utils = require('../').utils;

var xml = fs.readFileSync(__dirname +'/fixture/output.xml');

describe('utils.merge', function(){

  it('merge should exist', function(){
    utils.merge.should.be.ok;
  });

  it('should merge', function(){
    var obj1 = {test: 'me'}
      , obj2 = {test: 'this'}
      , output = utils.merge(obj1, obj2);

    output.test.should.eql('this');
  });

  it('should handle non objects properly', function(){
    var obj1 = {test: 'me'}
      , output = utils.merge(obj1, null);

    output.test.should.eql('me');
  });

  it('should merge into nothing', function(){
    var output = utils.merge(null, {test: 'this'});

    output.test.should.eql('this');
  });

  it('should merge nested objects properly', function(){
    var obj1 = { test: 'me', nest: { prop: 1}}
      , obj2 = { test: 'this', nest: { prop: 2}}
      , output = utils.merge(obj1, obj2);

    output.should.eql(obj1);
    output.test.should.eql('this');
    output.nest.prop.should.eql(2);
  });

  it('should merge all arguments together', function(){
    var output = utils.merge({test: 'me'}, null, {test: 'this'}, {passed: true});

    output.test.should.eql('this');
    output.passed.should.eql(true);

  });

});


describe('utils.isObj', function(){

  it('should return true for object', function(){
    utils.isObj({}).should.be.ok;
  });

  it('should return false for everything else', function(){
    utils.isObj(true).should.be.false;
    utils.isObj(3).should.be.false;
    utils.isObj("data").should.be.false;
    utils.isObj(null).should.be.false;
    utils.isObj([1,2,3]).should.be.false;
  })

});


describe('utils.parseXML', function(){

  it('should return json from XML buffer', function(){
    checkXML(utils.parseXML(xml));
  });

  it('should return json from XML string', function(){
    checkXML(utils.parseXML(xml.toString()));
  });

  it('should return json from libxmljs Node', function(){
    var root = libxml.parseXmlString(xml, { noblanks: true });
    checkXML(utils.parseXML(root));
  });

});

describe('utils.deepFreeze', function(){

  it('should handle null props', function(){
    var error;
    try {
      utils.deepFreeze({test: null});
    } catch(e) {
      error = e;
    }

    should.not.exist(error);
  });

  it('should handle error object props', function() {
    var error;
    try {
      utils.deepFreeze({test: new Error('error')});
    } catch(e) {
      error = e;
    }

    should.not.exist(error);

  });

  it('should throw when changing prop', function(){
    var err
      , obj = utils.deepFreeze({prop: 'test'});

    try {
      obj.prop = 'change';
    } catch(e) {
      error = e;
    }

    error.should.be.ok;
    error.should.be.instanceOf(Error);

  });

  it('should throw when adding prop', function(){
    var err
      , obj = utils.deepFreeze({prop: 'test'});

    try {
      obj.newprop = 'change';
    } catch(e) {
      error = e;
    }

    error.should.be.ok;
    error.should.be.instanceOf(Error);

  });

});



function checkXML(result){

  result.account.should.eql('DEMO');
  result.start_date.should.be.ok;
  result.end_date.should.be.ok;
  result.type.should.eql('DECLINED');

  result.terminal.name.should.eql('DEMO TERM ECOMM');
  result.terminal.card.length.should.eql(2);

  var card1 = result.terminal.card[0]
    , card2 = result.terminal.card[1];

  card1.name.should.eql("Stored Value Funded");
  card1.transaction.type.should.eql('Purchase');
  card1.transaction.currency.should.eql('USD');
  card1.totals.type.should.eql('Stored Value Funded');
  card1.totals.should.have.properties('type', 'count', 'currency', 'amount');

  result.terminal.totals.count.should.eql('2484');
  result.terminal.totals.currency.should.eql('USD');
  result.terminal.totals.amount.should.eql('13592616.56');
}
