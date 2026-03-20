import Aluno from "../models/Aluno.js";
import Foto from "../models/Foto.js";

class AlunoController {
  //create
  async store(req, res) {
    try {
      const novoAluno = await Aluno.create(req.body);
      const { id, nome, idade, sobrenome, altura, peso, email } = novoAluno;
      return res.json({ id, nome, idade, sobrenome, altura, peso, email });
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
      const alunos = await Aluno.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'idade', 'altura', 'peso', 'email'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['url', 'filename'],
        }
      });
      return res.json(alunos);
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
      const aluno = await Aluno.findByPk(req.params.id, {
        attributes: ['id', 'nome', 'sobrenome', 'idade', 'altura', 'peso', 'email'],
        include: {
          model: Foto,
          attributes: ['url', 'filename'],
        },
        order: [[Foto, 'id', 'DESC']]
      });

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }
  //update
  async update(req, res) {
    try {

      const aluno = await Aluno.findByPk(req.params.id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const novosDados = await aluno.update(req.body);

      const { id, nome, sobrenome, idade, altura, peso, email } = novosDados;
      return res.json({ id, nome, sobrenome, idade, altura, peso, email });

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

      const aluno = await Aluno.findByPk(req.params.id);

      await aluno.destroy(req.body);

      return (res.json(null));
    }
    catch (e) {
      res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }
}

export default new AlunoController();
