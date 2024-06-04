const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const compraController = require('../controllers/compraController');

// Ruta para actualizar la cantidad de un producto en el compra
router.post('/:id/:cantidad', async (req, res) => {
    const idProducto = req.params.id;
    const cantidad = parseInt(req.params.cantidad);
    let compra = res.locals.compra;
    const item = compra.find(item => parseInt(item.id) === parseInt(idProducto));
    const producto = await productoController.obtenerPorId(idProducto);
    if (item) {
        const cantidadNueva = item.cantidad + cantidad;
        if (cantidadNueva > 0 && cantidad <= producto.cantidad) {
            item.cantidad = cantidadNueva;
            producto.cantidad -= cantidad;
            if (item.cantidad === 0) {
                compra = compra.filter(item => item.id !== parseInt(idProducto));
            }
            // Actualizar la cantidad del producto en la base de datos
            await productoController.aumentarCantidad(producto.id, req.cookies.token);
        }
    }
    res.locals.compra = compra;
    res.redirect('/compras');
});

module.exports = router;
