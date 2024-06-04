const axios = require('axios');
const dotenv = require('dotenv');

//Configura DotEnv
dotenv.config();

class Producto {
  constructor(id, nombre, cantidad, precio_compra, precio_venta, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.precio_compra = precio_compra;
    this.precio_venta = precio_venta;
    this.imagen = imagen;
  }
}

async function obtenerTodos() {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/productos`);
    const productos = response.data;
    return productos.map(producto => new Producto(producto.id, producto.nombre, producto.cantidad, 
      producto.precio_compra, producto.precio_venta, producto.imagen));
  } catch (error) {
    console.error('Error al obtener todos los productos:', error);
    throw error;
  }
}

async function obtenerPorId(id) {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/productos/${id}`);
    const producto = response.data;
    return new Producto(producto.id, producto.nombre, producto.cantidad, 
      producto.precio_compra, producto.precio_venta, producto.imagen);
  } catch (error) {
    console.error('Error al obtener el producto por ID:', error);
    throw error;
  }
}

async function actualizarCantidad(nuevaCantidad, productoId, token) {
  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    await axios.put(`${process.env.BASE_URL}/productos/actualizar-cantidad`, { nuevaCantidad, productoId }, axiosConfig);
    console.log('Cantidad de producto actualizada');
  } catch (error) {
    console.error('Error al actualizar la cantidad del producto:', error);
    throw error;
  }
}

async function aumentarCantidad (productoId, token) {
  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    await axios.put(`${process.env.BASE_URL}/productos/aumentar-cantidad`, { productoId }, axiosConfig);
    console.log('Cantidad de producto aumentada');
  } catch (error) {
    console.error('Error al aumentar la cantidad del producto:', error);
    throw error;
  }
}

async function disminuirCantidad (productoId, token) {
  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    await axios.put(`${process.env.BASE_URL}/productos/disminuir-cantidad`, { productoId }, axiosConfig);
    console.log('Cantidad de producto disminuida');
  } catch (error) {
    console.error('Error al disminuir la cantidad del producto:', error);
    throw error;
  }
}

async function agregarProducto(producto, token) {
  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    await axios.put(`${process.env.BASE_URL}/productos/agregar-producto`, producto, axiosConfig);
    console.log('Producto agregado');
  } catch (error) {
    console.error('Error al agregar el producto:', error);
    throw error;
  }
}


module.exports = {
  obtenerTodos,
  obtenerPorId,
  actualizarCantidad,
  aumentarCantidad,
  disminuirCantidad,
  agregarProducto
};