const express = require('express');
const loginService = require('../services/login.service');

const { verifyToken } = require('../middlewares/auth.handler');

const router = express.Router();
const service = new loginService();

router.get('/', verifyToken, async (req, res, next) => {
  try {
    res.status(200).json({
      code: 200,
      message: 'Usuario logueado',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: 'Error interno del servidor intentelo mas tarde',
    });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const user = await service.signin(body);
    res.status(user.code).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: 'Error interno del servidor intentelo mas tarde',
    });
  }
});

module.exports = router;
