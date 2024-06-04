// routes/routes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware para proteger rutas

// Importa las rutas específicas
const index = require('./index');
const login = require('./login');
const registro = require('./registro');
const registrarUsuario = require('./registrar-usuario');
const catalogoRouter = require('./catalogo');
const productoRouter = require('./producto');
const ventasRouter = require('./ventas');
const comprasRouter = require('./compras');
const detalleVenta = require('./detalle-venta');
const detalleCompra = require('./detalle-compra');
const agregarVenta = require('./agregar-venta');
const agregarCompra = require('./agregar-compra');
const actualizarVenta = require('./actualizar-venta');
const aumentarCompra = require('./aumentar-compra');
const disminuirCompra = require('./disminuir-compra');
const eliminarVenta = require('./eliminar-venta');
const eliminarCompra = require('./eliminar-compra');
const procesarCompraRouter = require('./procesar-compra');
const agregarProducto = require('./agregar-producto');

// Configura las rutas
router.use('/', index);
router.use('/login', login);
router.use('/registro', registro);
router.use('/registrar-usuario', registrarUsuario);
router.use('/catalogo', catalogoRouter);
router.use('/producto', productoRouter);
router.use('/ventas', authMiddleware.authenticate, ventasRouter);
router.use('/compras', authMiddleware.authenticate, comprasRouter);
router.use('/detalle-venta', authMiddleware.authenticate, detalleVenta);
router.use('/detalle-compra', authMiddleware.authenticate, detalleCompra);
router.use('/agregar-venta', agregarVenta);
router.use('/agregar-compra', agregarCompra);
router.use('/actualizar-venta', actualizarVenta);
router.use('/aumentar-compra', aumentarCompra);
router.use('/disminuir-compra', disminuirCompra);
router.use('/eliminar-venta', eliminarVenta);
router.use('/eliminar-compra', eliminarCompra);
router.use('/procesar-compra', procesarCompraRouter);
router.use('/agregar-producto', agregarProducto);

module.exports = router;