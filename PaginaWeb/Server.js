const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para parsear formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'alumno',
  password: 'alumnoipm',
  database: 'NON_STOP'
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ Conectado a la base de datos NON_STOP');
});

// Servir archivos estáticos si los necesitás
const staticPath = path.resolve(__dirname, '..');
app.use(express.static(staticPath));

// Ruta para insertar usuario y su reserva
app.post('/reservas', (req, res) => {
  const {
    nombre,
    apellido,
    contacto,
    cantPersonas,
    sector,
    frees
  } = req.body;

  // 1. Insertar usuario
  const sqlUsuario = `
    INSERT INTO Usuario (nombre, apellido, contacto)
    VALUES (?, ?, ?)
  `;

  db.query(sqlUsuario, [nombre, apellido, contacto], (err, resultUsuario) => {
    if (err) {
      console.error('❌ Error al insertar usuario:', err);
      return res.status(500).send('Error al registrar el usuario');
    }

    const idUsuario = resultUsuario.insertId;

    // 2. Insertar reserva asociada al usuario
    const sqlReserva = `
      INSERT INTO Reserva (idUsuario, cantPersonas, sector, frees)
      VALUES (?, ?, ?, ?)
    `;

    db.query(sqlReserva, [idUsuario, cantPersonas, sector, frees], (err, resultReserva) => {
      if (err) {
        console.error('❌ Error al insertar reserva:', err);
        return res.status(500).send('Error al registrar la reserva');
      }

      res.send('✅ Usuario y reserva registrados correctamente');
      
    });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
