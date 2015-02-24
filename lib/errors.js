
function ResponseError (details) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.code = details.code;
  this.message = details.message;
  this.name = 'FirstDataResponseError';
};

ResponseError.prototype.__proto__ = Error.prototype;


function BankError (details) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.code = details.code;
  this.type = details.type;
  this.action = details.action;
  this.message = details.name;
  this.description = details.description;
  this.name = 'FirstDataBankResponseError';
}

BankError.prototype.__proto__ = Error.prototype;

exports.ResponseError = ResponseError;
exports.BankError = BankError;
