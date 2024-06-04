// controllers/productos.js
const productoModel = require('../models/productoModel');

async function obtenerTodos() {
  return await productoModel.obtenerTodos();
}

async function obtenerPorId(id) {
  return await productoModel.obtenerPorId(id);
}

async function actualizarCantidad(nuevaCantidad, productoId, token) {
  return await productoModel.actualizarCantidad(nuevaCantidad, productoId, token);
}

async function aumentarCantidad(productoId, token) {
  return await productoModel.aumentarCantidad(productoId, token);
}

async function disminuirCantidad(productoId, token) {
  return await productoModel.disminuirCantidad(productoId, token);
}

async function agregarProducto(producto, token) {
  return await productoModel.agregarProducto(producto, token);
}

module.exports = {
  obtenerTodos,
  obtenerPorId,
  actualizarCantidad,
  aumentarCantidad,
  disminuirCantidad,
  agregarProducto
};
