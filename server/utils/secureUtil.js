const noSniff = () => {

  let noSniff = (req, res, next) => {
    res.header('x-content-type-options', 'nosniff');
    next();
  };

  return noSniff;
}

const xFrame = (value) => {

  let xFrame = (req, res, next) => {
    res.header('x-frame-options', value);
    next();
  };

  return xFrame;
}

module.exports = {
  noSniff,
  xFrame,
};