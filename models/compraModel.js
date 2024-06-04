const axios = require('axios');

class ProductoCompra {
    constructor(id, nombre, cantidad, precio_compra, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio_compra = precio_compra;
        this.imagen = imagen;
      }
}

async function agregarCompra(usuarioId, productoId, cantidad, token) {
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await axios.post(`${process.env.BASE_URL}/compras/agregar`, {
            usuarioId,
            productoId,
            cantidad
        }, axiosConfig);
        return response.data;
    } catch (error) {
        console.error('Error al agregar el producto a compras:', error);
        throw error;
    }
}

async function obtenerProductosCompras(usuarioId, token) {
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await axios.get(`${process.env.BASE_URL}/compras/${usuarioId}`, axiosConfig);
        return response.data.map(producto => new ProductoCompra(
            producto.id,
            producto.nombre,
            producto.cantidad,
            producto.precio_compra,
            producto.imagen
        ));
    } catch (error) {
        console.error('Error al obtener los productos de compras:', error);
        throw error;
    }
}

async function actualizarCantidadCompra(cantidad, usuarioId, productoId, token) {
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await axios.put(`${process.env.BASE_URL}/compras/actualizar-compra`, {
            cantidad,
            usuarioId,
            productoId
        }, axiosConfig);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la cantidad en e compras:', error);
        throw error;
    }
}

async function quitarProductoCompras(usuarioId, productoId, token) {
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await axios.delete(`${process.env.BASE_URL}/compras/${usuarioId}/${productoId}`, axiosConfig);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el producto de compras:', error);
        throw error;
    }
}

module.exports = {
    agregarCompra,
    obtenerProductosCompras,
    actualizarCantidadCompra,
    quitarProductoCompras
};