const express = require('express');

const UserService = require('../services/usuario.service');
const { verifyToken, checkRoles } = require('../middlewares/auth.handler');

const router = express.Router();
const service = new UserService();

router.get(
  '/',
  verifyToken,
  checkRoles(['administrador']),
  async (req, res, next) => {
    try {
      const newUser = await service.findAll();
      res.status(200).json(newUser);
    } catch (error) {
      res.status(409).json({
        message: 'El nombre de usuario ya existe',
        code: 409,
      });
    }
  }
);
router.post(
  '/',
  verifyToken,
  checkRoles(['administrador']),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(200).json(newUser);
    } catch (error) {
      res.status(409).json({
        message: 'El nombre de usuario ya existe',
        code: 409,
      });
    }
  }
);

module.exports = router;
