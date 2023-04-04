const express = require('express');
const CiudadService = require('../services/ciudad.service');
const { verifyToken } = require('../middlewares/auth.handler');

const router = express.Router();
const service = new CiudadService();

router.get('/', verifyToken, async (req, res, next) => {
  try {
    const ciudades = await service.findAll();
    res.status(200).json(ciudades);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: 'Error interno del servidor intentelo mas tarde',
    });
  }
});
router.get('/locales/:id', verifyToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const ciudades = await service.findAllLocales(id);
    res.status(200).json(ciudades);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: 'Error interno del servidor intentelo mas tarde',
    });
  }
});

module.exports = router;
