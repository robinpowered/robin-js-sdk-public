var env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    tokens: {
      admin: "1",
      user: "9c6b008ded7b86778af02524ff2ba0622930c002d504bad860a2eb96b22112f559625a86edbb67058a4d2a8431f60c6b535dce1fab82c257d1dd16c5dff4c6f1",
    }
  }
};

module.exports = config[env];
