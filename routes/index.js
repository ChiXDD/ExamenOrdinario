// routes/index.js
const express = require('express');
const router = express.Router();

// Rutas públicas
router.get('/', (req, res) => {
  res.render('index', { title: `Ferreteria 'Chuchita'`, subtitulo: req.user != null ? `¡Hola ${req.user.nombre}!` : '', user: req.user != null ? `${req.user.nombre}` : '' });
});

module.exports = router;