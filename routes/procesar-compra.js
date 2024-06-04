const express = require('express');
const router = express.Router();

// Middleware para procesar la compra
router.post('/', (req, res) => {
    // Vaciar el carrito
    req.session.venta = [];
    req.session.compra = [];

    res.render('confirmacion-compra', { title: 'Proceso Exitoso!', user: req.user != null ? `${req.user.nombre}` : '' });
});

module.exports = router;
