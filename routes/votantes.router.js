const express = require('express');

const VotanteService = require('../services/votante.service');
const { verifyToken, checkRoles } = require('../middlewares/auth.handler');

const router = express.Router();
const service = new VotanteService();

router.get(
  '/',
  verifyToken,
  checkRoles(['administrador', 'usuario']),
  async (req, res, next) => {
    try {
      const { query } = req;
      const votantes = await service.findAll(query);
      res.status(200).json(votantes);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Ocurrió un error, intente más tarde',
        code: 500,
      });
    }
  }
);

router.get(
  '/mesaorden',
  verifyToken,
  checkRoles(['administrador', 'usuario']),
  async (req, res, next) => {
    try {
      const { query } = req;
      const votantes = await service.findAllMesaOrder(query);
      res.status(200).json(votantes);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Ocurrió un error, intente más tarde',
        code: 500,
      });
    }
  }
);
router.get(
  '/mesaorden/:id',
  verifyToken,
  checkRoles(['administrador', 'usuario']),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { query } = req;
      const votantes = await service.findAllMesaOrderByLocal(query, id);
      res.status(200).json(votantes);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Ocurrió un error, intente más tarde',
        code: 500,
      });
    }
  }
);

router.get(
  '/general/',
  verifyToken,
  checkRoles(['administrador']),
  async (req, res, next) => {
    try {
      const votantes = await service.getStadistics();
      res.status(200).json(votantes);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Ocurrió un error, intente más tarde',
        code: 500,
      });
    }
  }
);

router.get(
  '/general/departamento/',
  verifyToken,
  checkRoles(['administrador']),
  async (req, res, next) => {
    try {
      const votantes = await service.getStadisticsGroupByCiudad();
      res.status(200).json(votantes);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Ocurrió un error, intente más tarde',
        code: 500,
      });
    }
  }
);

router.get(
  '/:id',
  verifyToken,
  checkRoles(['administrador', 'usuario']),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const votantes = await service.findOne(id);
      res.status(200).json(votantes);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Ocurrió un error, intente más tarde',
        code: 500,
      });
    }
  }
);

router.put(
  '/:id',
  verifyToken,
  checkRoles(['administrador', 'usuario']),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const votantes = await service.update(id, body);
      res.status(200).json(votantes);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Ocurrió un error, intente más tarde',
        code: 500,
      });
    }
  }
);

module.exports = router;
