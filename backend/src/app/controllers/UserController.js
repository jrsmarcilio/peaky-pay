const User = require('../models/User');

class UserController {
  async store(req, res) {
    // procurar no banco usuário com o e-mail = req.body.email
    const userExists = await User.findOne({ where: { email: req.body.email } });

    // se o usuário já existir, retorna a mensagem de erro
    if (userExists)
      return res.status(400).json({ error: 'Usuário já existe.' });

    // cadastrando usuário no banco de dados
    await User.create(req.body);

    return res.redirect('/api/login');
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    // Verificação de email para identificar se usuário já existe
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists)
        return res.status(400).json({ error: 'Usuário já existe.' });
    }

    // Somente checka o password se o usuário informar a senha antiga
    if (oldPassword && !(await user.checkPassword(oldPassword)))
      return res.status(401).json({ error: 'Senha não corresponde.' });

    const { id, nome, cpf } = await user.update(req.body);

    return res.json({ id, nome, email, cpf });
  }
}

module.exports = new UserController();
