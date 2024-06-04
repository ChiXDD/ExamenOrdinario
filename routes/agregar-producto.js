const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Ruta para agregar un producto
router.get('/', async (req, res) => {
    res.render('agregar-producto');
});

router.post('/', async (req, res) => {
    const { nombre, cantidad, precio_compra, precio_venta, imagen} = req.body;
    try {
        // Agregar producto a la base de datos
        await productoController.agregarProducto({ nombre, cantidad, precio_compra, precio_venta, imagen}, req.cookies.token);
        res.redirect('/catalogo');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;