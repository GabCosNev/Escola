"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _appconfigjs = require('../config/app.config.js'); var _appconfigjs2 = _interopRequireDefault(_appconfigjs);

 class Foto extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: _sequelize.Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ficar vazio.'
          }
        }
      },
      filename: {
        type: _sequelize.Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ficar vazio.'
          }
        }
      },
      url:{
        type: _sequelize.Sequelize.VIRTUAL,
        get() {
          return `${_appconfigjs2.default.url}/images/${this.getDataValue('filename')}`;
        }
      },
      aluno_id: {
        type: _sequelize.Sequelize.INTEGER,
        defaultValue: null,
      },
    }, {
      sequelize,
      tableName: 'fotos',
    });
    return this;
  }

  static associations(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' });
  }
} exports.default = Foto;
