const jwt = require('jsonwebtoken');

const authConfig = require('../../config/authenticate');
const User = require('../models/User');

class SessionControler {
  async store(req, res) {
    const { email, password } = req.body;

    // verificação de usuário
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'usuário não encontrado' });

    // verificando se o password não bate
    if (!(await user.checkPassword(password)))
      return res.status(401).json({ error: 'senha não corresponde' });

    // Se chegou até aqui, deu tudo certo.
    const { id, nome } = user;

    return res.json({
      usuario: {
        id,
        nome,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

module.exports = new SessionControler();
