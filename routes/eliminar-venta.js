const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const ventaController = require('../controllers/ventaController');

// Ruta para eliminar un producto del venta
router.post('/:id', async (req, res) => {
    const idProducto = parseInt(req.params.id);
    let venta = res.locals.venta;
    const itemIndex = venta.findIndex(item => parseInt(item.id) === idProducto);
    if (itemIndex !== -1) {
      const removedItem = venta.splice(itemIndex, 1)[0];
      await ventaController.quitarProductoVentas(req.user.id, idProducto, req.cookies.token);
      const producto = await productoController.obtenerPorId(idProducto);
      if (producto) {
        producto.cantidad += removedItem.cantidad;
        await productoController.actualizarCantidad(producto.cantidad, idProducto, req.cookies.token);
      }
    }
    res.locals.venta = venta;
    res.redirect('/ventas');
});

module.exports = router;
