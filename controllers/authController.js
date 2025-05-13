const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
 
exports.registrar = [
  body('correo').notEmpty().withMessage('El correo es requerido'),
  body('contraseña').notEmpty().withMessage('La contraseña es requerida'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    const { correo, contraseña } = req.body;
    const hash = await bcrypt.hash(contraseña, 10);
    const usuario = new Usuario({ correo, contraseña: hash });
    await usuario.save();
    res.status(201).send('Usuario creado');
  }
];
 
exports.login = [
  body('correo').notEmpty().withMessage('El correo es requerido'),
  body('contraseña').notEmpty().withMessage('La contraseña es requerida'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    const { correo, contraseña } = req.body;
    const usuario = await Usuario.findOne({ correo });
    if (!usuario || !(await bcrypt.compare(contraseña, usuario.contraseña))) {
      return res.status(401).send('Credenciales inválidas');
    }
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  }
];