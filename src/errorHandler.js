class ErrorHandler {
  constructor() {
    this.statusCode = 500;
    this.message = "Error interno del servidor";
    this.methodName = "";
    this.errorStack = null;
  }
  badRequest(message) {
    this.statusCode = 400;
    this.message = message;
    this.errorStack = message;
    return this;
  }
  conflict(message) {
    this.statusCode = 409;
    this.message = message;
    this.errorStack = message;
    return this;
  }
  unauthorized(message) {
    this.statusCode = 401;
    this.message = message;
    this.errorStack = message;
    return this;
  }
  notFound(message) {
    this.statusCode = 404;
    this.message = message;
    this.errorStack = message;
    return this;
  }
  internalServerError(message) {
    this.statusCode = 500;
    this.message = message;
    this.errorStack = message;
    return this;
  }
  method(methodName) {
    this.methodName = methodName;
    return this;
  }
  error(error, message) {
    this.statusCode = error.statusCode || 400;
    this.message = message ? message : error.message || "Bad Request";
    this.errorStack = error;
    return this;
  }
  debug(params) {
    const error = new Error();
    if (error) {
      console.error('Error: ', {
        statusCode: this.statusCode,
        params: params || null,
        method: this.methodName,
        message: this.message,
        error: this.errorStack
      });
      console.error(error);
    }
    return this;
  }
  build() {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}
exports.errorHandler = ErrorHandler;
