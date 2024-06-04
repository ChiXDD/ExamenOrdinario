const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');


// Configuración de bodyParser para manejar cargas grandes
router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Ruta para agregar un producto
router.get('/', async (req, res) => {
    res.render('agregar-producto');
});

// Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Asegúrate de que el directorio 'uploads' exista
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

router.post('/', upload.single('imagen'), async (req, res) => {
    const { nombre, cantidad, precio_compra, precio_venta } = req.body;
    const imagenPath = req.file.path; // La ruta del archivo subido

    // Convertir la imagen a base64 antes de enviarla
    const base64Image = fs.readFileSync(imagenPath, { encoding: 'base64' });
    const producto = { nombre, cantidad, precio_compra, precio_venta, imagen: base64Image };

    try {
        await productoController.agregarProducto(producto, req.session.token);
        res.redirect('/catalogo');
    } catch (error) {
        res.status(400).send('Hubo un error al agregar el producto');
    }
});


module.exports = router;