const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const compraController = require('../controllers/compraController');

// Ruta para agregar un producto al compra
router.post('/:id', async (req, res) => {
    const idProducto = req.params.id;
    const producto = await productoController.obtenerPorId(idProducto);
    if (producto && producto.cantidad > 0) {
        let compra;
        if(res.locals.compra.length > 0){
            compra = res.locals.compra;
        } else {
            compra = req.session.compra || [];
        }
        let productoEnCarrito = compra.find(item => parseInt(item.id) === parseInt(idProducto));
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
            if(req.hasOwnProperty('user')){
                await compraController.agregarCompra(req.user.id, idProducto, productoEnCarrito.cantidad, req.cookies.token);
            }
        } else {
            compra.push({ id: idProducto, nombre: producto.nombre, precio: producto.precio_compra, cantidad: 1 , imagen: producto.imagen});
            if(req.hasOwnProperty('user')){
                await compraController.agregarCompra(req.user.id, idProducto, 1, req.cookies.token);
            }
        }
        producto.cantidad--;
        if(req.hasOwnProperty('user')){
            await productoController.aumentarCantidad(producto.id, req.cookies.token);
        }
        if(res.locals.compra.length > 0){
            res.locals.compra = compra;
        } else {
            req.session.compra = compra;
        }
        res.redirect('/catalogo');
    } else {
        res.status(404).send('Producto no encontrado o no disponible');
    }
  });  

module.exports = router;
