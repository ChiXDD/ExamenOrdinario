const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const ventaController = require('../controllers/ventaController');

// Ruta para actualizar la cantidad de un producto en el venta
router.post('/:id/:cantidad', async (req, res) => {
    const idProducto = req.params.id;
    const cantidad = parseInt(req.params.cantidad);
    let venta = res.locals.venta;
    const item = venta.find(item => parseInt(item.id) === parseInt(idProducto));
    const producto = await productoController.obtenerPorId(idProducto);
    if (item) {
        const cantidadNueva = item.cantidad + cantidad;
        if (cantidadNueva > 0 && cantidad <= producto.cantidad) {
            item.cantidad = cantidadNueva;
            producto.cantidad -= cantidad;
            if (item.cantidad === 0) {
                venta = venta.filter(item => item.id !== parseInt(idProducto));
            }
            // Actualizar la cantidad del producto en la base de datos
            await ventaController.actualizarCantidadVenta(cantidadNueva, req.user.id, idProducto, req.cookies.token);
            await productoController.actualizarCantidad(producto.cantidad, idProducto, req.cookies.token);
        }
    }
    res.locals.venta = venta;
    res.redirect('/ventas');
});

module.exports = router;
