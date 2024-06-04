// controllers/carrito.js
const ventaModel = require('../models/ventaModel');

async function agregarVenta(usuarioId, productoId, cantidad, token) {
    return await ventaModel.agregarVenta(usuarioId, productoId, cantidad, token);
}

async function obtenerProductosVentas(usuarioId, token) {
    return await ventaModel.obtenerProductosVentas(usuarioId, token);
}

async function actualizarCantidadVenta(cantidad, usuarioId, productoId, token) {
    return await ventaModel.actualizarCantidadVenta(cantidad, usuarioId, productoId, token);
}

async function quitarProductoVentas(usuarioId, productoId, token) {
    return await ventaModel.quitarProductoVentas(usuarioId, productoId, token);
}

module.exports = {
    agregarVenta,
    obtenerProductosVentas,
    actualizarCantidadVenta,
    quitarProductoVentas
};
