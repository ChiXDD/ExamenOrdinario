const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const ventaController = require('../controllers/ventaController');

// Ruta para agregar un producto a las ventas
router.post('/:id', async (req, res) => {
    const idProducto = req.params.id;
    const producto = await productoController.obtenerPorId(idProducto);
    if (producto && producto.cantidad > 0) {
        let venta;
        if(res.locals.venta.length > 0){
            venta = res.locals.venta;
        } else {
            venta = req.session.venta || [];
        }
        let productoEnVenta = venta.find(item => parseInt(item.id) === parseInt(idProducto));
        if (productoEnVenta) {
            productoEnVenta.cantidad++;
            if(req.hasOwnProperty('user')){
                await ventaController.agregarVenta(req.user.id, idProducto, productoEnVenta.cantidad, req.cookies.token);
            }
        } else {
            venta.push({ id: idProducto, nombre: producto.nombre, precio: producto.precio_venta, cantidad: 1 , imagen: producto.imagen});
            if(req.hasOwnProperty('user')){
                await ventaController.agregarVenta(req.user.id, idProducto, 1, req.cookies.token);
            }
        }
        producto.cantidad--;
        if(req.hasOwnProperty('user')){
            await productoController.actualizarCantidad(producto.cantidad, idProducto, req.cookies.token);
        }
        if(res.locals.venta.length > 0){
            res.locals.venta = venta;
        } else {
            req.session.venta = venta;
        }
        res.redirect('/catalogo');
    } else {
        res.status(404).send('Producto no encontrado o no disponible');
    }
  });  

module.exports = router;
