const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware para proteger rutas

// Ruta para el detalle de compra
router.get('/', authMiddleware.authenticate, (req, res) => {
    let venta = res.locals.venta;
    res.render('detalle-venta', { title: 'Detalle de Venta', venta, user: req.user != null ? `${req.user.nombre}` : '' });
});

module.exports = router;
