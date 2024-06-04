const axios = require('axios');

class ProductoVenta {
    constructor(id, nombre, cantidad, precio_venta, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio_venta = precio_venta;
        this.imagen = imagen;
      }
}

async function agregarVenta(usuarioId, productoId, cantidad, token) {
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await axios.post(`${process.env.BASE_URL}/ventas/agregar`, {
            usuarioId,
            productoId,
            cantidad
        }, axiosConfig);
        return response.data;
    } catch (error) {
        console.error('Error al agregar el producto a ventas:', error);
        throw error;
    }
}

async function obtenerProductosVentas(usuarioId, token) {
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await axios.get(`${process.env.BASE_URL}/ventas/${usuarioId}`, axiosConfig);
        return response.data.map(producto => new ProductoVenta(
            producto.id,
            producto.nombre,
            producto.cantidad,
            producto.precio_venta,
            producto.imagen
        ));
    } catch (error) {
        console.error('Error al obtener los productos de ventas:', error);
        throw error;
    }
}

async function actualizarCantidadVenta(cantidad, usuarioId, productoId, token) {
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await axios.put(`${process.env.BASE_URL}/ventas/actualizar-venta`, {
            cantidad,
            usuarioId,
            productoId
        }, axiosConfig);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la cantidad en e ventas:', error);
        throw error;
    }
}

async function quitarProductoVentas(usuarioId, productoId, token) {
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await axios.delete(`${process.env.BASE_URL}/ventas/${usuarioId}/${productoId}`, axiosConfig);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el producto de ventas:', error);
        throw error;
    }
}

module.exports = {
    agregarVenta,
    obtenerProductosVentas,
    actualizarCantidadVenta,
    quitarProductoVentas
};