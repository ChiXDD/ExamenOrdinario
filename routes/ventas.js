const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware para proteger rutas

// Ruta para el venta de compra
router.get('/', authMiddleware.authenticate, async (req, res) => {
    let venta = res.locals.venta;

    res.render('ventas', { title: 'VENTAS', venta, user: req.user != null ? `${req.user.nombre}` : '' });
});

module.exports = router;
