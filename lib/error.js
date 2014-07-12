function ResponseError (code, msg) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.code = code;
  this.message = msg;
  this.name = 'FirstDataResponseError';
};

ResponseError.prototype.__proto__ = Error.prototype;


function BankError (code, details) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.code = code;
  this.type = details.type;
  this.action = details.action;
  this.message = details.description;
  this.name = 'BankError: ' + details.name;
}

BankError.prototype.__proto__ = Error.prototype;

exports.ResponseError = ResponseError;
exports.BankError = BankError;