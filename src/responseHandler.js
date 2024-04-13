const responseHandler = (data, message) => {
  return { statusCode: 200, message, data };
}

exports.responseHandler = responseHandler;
