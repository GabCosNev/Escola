"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
_dotenv2.default.config();

var _appjs = require('./app.js'); var _appjs2 = _interopRequireDefault(_appjs);

const port = process.env.APP_PORT;

_appjs2.default.listen(port, () => {
  //console.log(`Rodando na porta ${port}`);
});
