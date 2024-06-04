const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware para proteger rutas

// Ruta para el compra de compra
router.get('/', authMiddleware.authenticate, async (req, res) => {
    let compra = res.locals.compra;

    res.render('compras', { title: 'COMPRAS', compra, user: req.user != null ? `${req.user.nombre}` : '' });
});

module.exports = router;
