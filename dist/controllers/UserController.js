"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Userjs = require('../models/User.js'); var _Userjs2 = _interopRequireDefault(_Userjs);

class UserController {
  //create
  async store(req, res) {
    try {
      const novoUser = await _Userjs2.default.create(req.body);
      const { id, nome, email } = novoUser;
      return res.json({ id, nome, email });
    }
    catch (e) {
      res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }
  //index
  async index(req, res) {
    try {
      const user = await _Userjs2.default.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(user);
    }
    catch (e) {
      res.status(400).json({
        errors: e.errors.map(err => err.message)
      });

    }
  }
  //show
  async show(req, res) {
    try {
      const user = await _Userjs2.default.findByPk(req.params.id);
      const { id, nome, email } = user;
      return res.json({ id, nome, email });
    }
    catch (e) {
      res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }
  //update
  async update(req, res) {
    try {

      const user = await _Userjs2.default.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const novosDados = await user.update(req.body);

      const { id, nome, email } = novosDados;
      return res.json({ id, nome, email });
    }
    catch (e) {
      res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }
  //delete
  async delete(req, res) {
    try {

      const user = await _Userjs2.default.findByPk(req.userId);

      await user.destroy(req.body);

      return(res.json(null));
    }
    catch (e) {
      res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }
}

exports. default = new UserController();
