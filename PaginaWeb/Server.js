const express = require('express')
const app = express()
const port = 3000
app.get('/', (req, res) => {
 res.send('Hello World!')
})
app.get('/contacto', (req, res) => {
 res.sendFile(__dirname+"/formulario.html")
})
app.get('/insertar', (req, res) => {
   var nombre = req.query.nombre;
   var apellido = req.query.apellido;
   var contacto = req.query.contacto;
   var personas = req.query.personas;
   var sector = req.query.sector;
   var frees = req.query.frees;  
 var mysql      = require('mysql');
 var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'alumno',
  password : 'alumnoipm',
  database : 'NON_STOP'
});
 
connection.connect();

connection.query('INSERT INTO Usuario (nombre, apellido, contacto) VALUES (?, ?, ?)', [nombre, apellido, contacto], function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
connection.query('INSERT INTO Reserva (personas, sector, frees) VALUES (?, ?, ?)', [personas, sector, frees], function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
connection.end();
})
app.listen(port, () => {
 console.log(`Example app listening on port ${port}`)
})