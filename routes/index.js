const express = require('express');
const loginRouter = require('./login.router');
const usersRouter = require('./usuarios.router');
const votantesRouter = require('./votantes.router');
const ciudadesRouter = require('./ciudades.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/', router);
  router.use('/login', loginRouter);
  router.use('/usuarios', usersRouter);
  router.use('/votantes', votantesRouter);
  router.use('/ciudades', ciudadesRouter);
}

module.exports = routerApi;
