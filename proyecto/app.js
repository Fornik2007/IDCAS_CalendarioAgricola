const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');

// Middleware para analizar los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos (CSS, imágenes, etc.)
app.use(express.static('public'));

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ccrj1108231407&',
    database: 'user_auth_db'
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para mostrar el formulario de inicio de sesión
app.get('/', (req, res) => {
    res.render('login');
});

// Ruta para procesar el inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send('¡Inicio de sesión exitoso!');
        } else {
            res.render('registro', { message: 'No se puede acceder porque no tiene una cuenta. Por favor, regístrese.' });
        }
    });
});

// Ruta para mostrar el formulario de registro
app.get('/registro', (req, res) => {
    res.render('registro', { message: '' }); // Asegúrate de pasar un valor por defecto o vacío
});

// Ruta para procesar el registro de usuarios
app.post('/registro', (req, res) => {
    const { username, password } = req.body;
    const sql = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('¡Registro exitoso! Ahora puedes iniciar sesión.');
    });
});

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
