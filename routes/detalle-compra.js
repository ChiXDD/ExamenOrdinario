const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware para proteger rutas

// Ruta para el detalle de compra
router.get('/', authMiddleware.authenticate, (req, res) => {
    let compra = res.locals.compra;
    res.render('detalle-compra', { title: 'Detalle de Compra', compra, user: req.user != null ? `${req.user.nombre}` : '' });
});

module.exports = router;
