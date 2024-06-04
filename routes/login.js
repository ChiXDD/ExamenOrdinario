//routes/login.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware para proteger rutas

// Ruta para mostrar el formulario de login
router.get('/', (req, res) => {
  res.render('login', { title: 'Iniciar sesión', user: req.user != null ? `${req.user.nombre}` : '' });
});

router.post('/', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), async (req, res) => {
  // Si se autentica correctamente, crea un token JWT
  const token = authMiddleware.generateToken(req.user.id, '1h');

  res.cookie('token', token, { httpOnly: true, secure: false });

  let venta = res.locals.venta;
  let compra = res.locals.compra;

  if (venta) {
    await duplicarVentaEnDB(req.user.id, venta, token);
  }

  if (compra) {
    await duplicarCompraEnDB(req.user.id, venta, token);
  }
  res.redirect('/');
});


async function duplicarVentaEnDB(usuarioId, venta, token) {
  for (const producto in venta) {
    console.log('Producto: ' + venta[producto].nombre);

    await ventaController.agregarProducto(usuarioId, venta[producto].id, venta[producto].cantidad, token);
  }
}

async function duplicarCompraEnDB(usuarioId, compra, token) {
  for (const producto in compra) {
    console.log('Producto: ' + compra[producto].nombre);

    await compraController.agregarProducto(usuarioId, compra[producto].id, compra[producto].cantidad, token);
  }
}

module.exports = router;