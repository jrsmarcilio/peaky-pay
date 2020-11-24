const { Router } = require('express');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

const authMiddleware = require('./app/middlewares/auth');

const routes = new Router();

routes.get('/', (req, res) => {
  res.sendFile(`${__dirname}/pages/index.html`);
});
routes.get('/login', (req, res) => {
  res.sendFile(`${__dirname}/pages/login.html`);
});
routes.get('/reg', (req, res) => {
  res.sendFile(`${__dirname}/pages/register.html`);
});

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
// Rotas após o AuthMiddleware precisam está logado

routes.put('/users', UserController.update);

module.exports = routes;
