const { body, validationResult } = require('express-validator');
const Estudiante = require('../models/Estudiante');
 
exports.listar = async (req, res) => {
  const lista = await Estudiante.find();
  res.json(lista);
};
 
exports.crear = [
  body('nombre').notEmpty().withMessage('El nombre es requerido'),
  body('carrera').notEmpty().withMessage('La carrera es requerida'),
  body('edad').notEmpty().withMessage('La edad es requerida'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    const estudiante = new Estudiante(req.body);
    await estudiante.save();
    res.status(201).json(estudiante);
  }
];
