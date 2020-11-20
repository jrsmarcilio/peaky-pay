const User = require('../models/User');

class UserController {
  async store(req, res) {
    // procurar no banco usuário com o e-mail = req.body.email
    const userExists = await User.findOne({ where: { email: req.body.email } });

    // se o usuário já existir, retorna a mensagem de erro
    if (userExists)
      return res.status(400).json({ error: 'Usuário já existe.' });

    // cadastrando usuário no banco de dados
    const { id, name, email, cpf, telefone } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      cpf,
      telefone,
    });
  }
}

module.exports = new UserController();
