var https = require('https')
  , crypto = require('crypto')
  , querystring = require('querystring')
  , libxml = require('libxmljs');

module.exports = {
  merge: merge
, isObj: isObj
, parseXML: parseXML
, createSecureHeaders: createSecureHeaders
, request: request
};

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

function createSecureHeaders(payload, settings){
  var digest = crypto.createHash("sha1").update(payload).digest('hex')
    , time = settings.time || (new Date).toISOString().replace(/\.[0-9]{3}Z$/,'Z') // first data does not support fractional seconds
    , authcode = crypto.createHmac('sha1', settings.hmac)
        .update(['POST', 'application/json', digest, time, settings.uri].join("\n"))
        .digest('base64');

  return {
          'Authorization': 'GGE4_API ' + settings.key + ':' + authcode
        , 'X-GGe4-Date': time
        , 'X-GGe4-Content-SHA1': digest
        , 'Content-Type': 'application/json'
        , 'Accept': 'application/json'
        , 'Content-Length': payload.length
  };
}

function request(options, payload, callback) {

  if(options.method === 'GET') {
    var qs = querystring.stringify(payload);
    if(qs) options.path += '?' + qs;
  }

  var req = https.request(options);

  req.setTimeout(options.timeout || 3000, function(){
    req.abort();
  });

  req.once('response', function(resp){
    resp.text = '';
    resp.setEncoding('utf8');
    resp.on('data', function(chunk){ resp.text += chunk; });
    resp.on('end', function(){
      callback(null, resp);
    });
  });

  req.on('error', function(err){
    callback(err);
  });

  if(options.method === 'POST') req.write(payload);

  req.end();

}

/*
  Will Accept XML string, XML Buffer, a libxml node
*/
function parseXML (root, result) {
  result = result || {};

  if(typeof root === 'string' || root instanceof Buffer){
    root = libxml.parseXmlString(root, { noblanks: true });
  }

  var el = root.child(0);

  if(!el) return undefined;
  if (el.type() === 'text') return el.text();
  while(el = _normalizeXML(el));

  return result;

}


function _normalizeXML(el){
  var name = el.name()
    , val = parseXML(el);

  if(result[name]){
    if(Array.isArray(result[name])) result[name].push(val);
    else result[name] = [result[name], val];
  } else result[name] = val;

  return el.nextSibling();
}
