const Yup = require("yup");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = {
  async index(req, res) {},
  async show(req, res) {},
  async store(req, res) {
    //yup validation
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        code: 101,
        message: "Erro: Dados inválidos!",
      });
    }

    const emailExiste = await User.findOne({ email: req.body.email });
    if (emailExiste) {
      return res.status(400).json({
        error: true,
        code: 102,
        message: "Error: E-mail já está cadastrado!",
      });
    }

    const dados = req.body;

    dados.password = await bcrypt.hash(dados.password, 8);

    const user = await User.create(dados, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          code: 103,
          message: "Erro: Usuário não cadastrado!",
        });

      return res.status(200).json({
        error: false,
        message: "Usuário cadastrado com sucesso!",
        dados: user,
      });
    });
  },
  async update(req, res) {},
  async delete(req, res) {},
};
