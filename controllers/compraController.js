// controllers/carrito.js
const compraModel = require('../models/compraModel');

async function agregarCompra(usuarioId, productoId, cantidad, token) {
    return await compraModel.agregarCompra(usuarioId, productoId, cantidad, token);
}

async function obtenerProductosCompras(usuarioId, token) {
    return await compraModel.obtenerProductosCompras(usuarioId, token);
}

async function actualizarCantidadCompra(cantidad, usuarioId, productoId, token) {
    return await compraModel.actualizarCantidadCompra(cantidad, usuarioId, productoId, token);
}

async function quitarProductoCompras(usuarioId, productoId, token) {
    return await compraModel.quitarProductoCompras(usuarioId, productoId, token);
}

module.exports = {
    agregarCompra,
    obtenerProductosCompras,
    actualizarCantidadCompra,
    quitarProductoCompras
};
