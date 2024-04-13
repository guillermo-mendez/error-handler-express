const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};
exports.catchAsync = catchAsync;