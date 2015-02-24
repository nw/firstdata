module.exports = {
  Client: require('./client')
, Response: require('./response')
, errors: require('./errors')
, utils: require('./utils')
, codes: require('./codes')
, createClient: createClient
}


function createClient(options, defaults) {
  return new module.exports.Client(options, defaults);
}
