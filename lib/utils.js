
module.exports = {
  merge: merge
, isObj: isObj
}

function isObj(x){ 
  if(!x || Array.isArray(x)) return false;
  return (typeof x === 'object'); 
}

function merge(){
  return [].slice.call(arguments, 0)
    .reduce(function(o1, o2){
      if(!o1) return o2 || {};
      if(!o2 || !isObj(o2)) return o1;
      for(var i in o2){
        if(isObj(o2[i]) && isObj(o1[i])) merge(o1[i], o2[i]);
        else o1[i] = o2[i];
      }
      return o1;
    });
}