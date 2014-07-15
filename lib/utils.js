var libxml = require('libxmljs');


module.exports = {
  merge: merge
, isObj: isObj
, parseXML: parseXML
}

function isObj(x){ 
  if(!x || Array.isArray(x)) return false;
  return (typeof x === 'object'); 
}

function merge(){
  var args = [].slice.call(arguments, 0);
  
  return args.reduce(function(o1, o2){
    if(!o1) return o2 || {};
    if(!o2 || !isObj(o2)) return o1;
    for(var i in o2){
      if(isObj(o2[i]) && isObj(o1[i])) merge(o1[i], o2[i]);
      else o1[i] = o2[i];
    }
    return o1;
  });
}

/*
  Will Accept XML string, XML Buffer, a libxml node
*/
function parseXML (root, result) {
  result = result || {};
  
  if(typeof root === 'string' || root instanceof Buffer) 
    root = libxml.parseXmlString(root, { noblanks: true });
  
  var el = root.child(0);
  
  if(!el) return undefined;  
  if (el.type() === 'text') return el.text();
  while(el = chk(el));
  
  return result;
  
  function chk(el){
    var name = el.name()
      , val = parseXML(el);
      
    if(result[name]){
      if(Array.isArray(result[name])) result[name].push(val);
      else result[name] = [result[name], val];
    } else result[name] = val;
    
    return el.nextSibling();
  }
}