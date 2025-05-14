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

exports.actualizar = [
  body('nombre').notEmpty().withMessage('El nombre es requerido'),
  body('carrera').notEmpty().withMessage('La carrera es requerida'),
  body('edad').notEmpty().withMessage('La edad es requerida'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    const { id } = req.params;
    let estudiante = await Estudiante.findByIdAndUpdate(id, req.body, { new: false });
    if (!estudiante) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    }
    estudiante = await Estudiante.findById(id);
    res.json(estudiante);
  }
];

exports.eliminar = async (req, res) => {
  const { id } = req.params;
  const estudiante = await Estudiante.findByIdAndDelete(id);
  if (!estudiante) {
    return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
  }
  res.json({ mensaje: 'Estudiante eliminado' });
};

exports.buscarPorId = async (req, res) => {
  const { id } = req.params;
  const estudiante = await Estudiante.findById(id);
  if (!estudiante) {
    return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
  }
  res.json(estudiante);
}
