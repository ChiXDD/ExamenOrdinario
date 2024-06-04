const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const compraController = require('../controllers/compraController');

// Ruta para eliminar un producto del compra
router.post('/:id', async (req, res) => {
    const idProducto = parseInt(req.params.id);
    let compra = res.locals.compra;
    const itemIndex = compra.findIndex(item => parseInt(item.id) === idProducto);
    if (itemIndex !== -1) {
      const removedItem = compra.splice(itemIndex, 1)[0];
      await compraController.quitarProductoCompras(req.user.id, idProducto, req.cookies.token);
      const producto = await productoController.obtenerPorId(idProducto);
      if (producto) {
        producto.cantidad += removedItem.cantidad;
        await productoController.actualizarCantidad(producto.cantidad, idProducto, req.cookies.token);
      }
    }
    res.locals.compra = compra;
    res.redirect('/compras');
});

module.exports = router;
