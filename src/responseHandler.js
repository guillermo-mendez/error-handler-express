const sendSuccessResponse = (data, message) => {
  return { statusCode: 200, message, data };
}

module.exports = sendSuccessResponse;
