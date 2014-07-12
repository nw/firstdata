var utils = require('../lib/utils');

describe('Utilities', function(){
  
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
  
  it('isObj should return true for object', function(){
    utils.isObj({}).should.be.ok;
  });
  
  it('isObj should return false for everything else', function(){
    utils.isObj(true).should.be.false;
    utils.isObj(3).should.be.false;
    utils.isObj("data").should.be.false;
    utils.isObj(null).should.be.false;
    utils.isObj([1,2,3]).should.be.false;
  })
  
  
})