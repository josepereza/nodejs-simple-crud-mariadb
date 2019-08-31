var express = require('express');
var router = express.Router();
const mariadb = require('mariadb');
var db = mariadb.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'seq_db'
})

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/listado', function (req, res, next) {

  db.then(conn => {
    conn.query("select * from Usuarios")
      .then(rows => {
        res.render('listado', {
          rows
        });

      })
  })
});

router.post('/grabar', function (req, res, next) {
  var nombre = req.body.nombre;
  var poblacion = req.body.poblacion;
  var saldo = req.body.saldo
  db.then(conn => {
    conn.query("insert into Usuarios(nombre,poblacion,saldo) values(?,?,?)", [nombre, poblacion, saldo])
      .then(rows => {
        res.redirect('/users/listado');

      })
  })
});

router.post('/borrar/:borrar', function (req, res, next) {
  var borrar = req.params.borrar;

  db.then(conn => {
    conn.query("delete from Usuarios where id = ?", [borrar])
      .then(rows => {
        res.redirect('/users/listado');

      })
      .catch(error => res.json(error));
  })
});
router.get('/editar/:id', function (req, res, next) {
  const id = req.params.id;

  db.then(conn => {
    conn.query("select * from Usuarios where id= ?", [id])
      .then(rows => {

        res.render('editar', {
          row: rows[0]
        });

      })

  })
});
router.post('/modificar/:modificar', function (req, res, next) {
  const modificar = req.params.modificar;
  var nombre = req.body.nombre;
  var poblacion = req.body.poblacion;
  var saldo = req.body.saldo
  db.then(conn => {
    conn.query("update  Usuarios set nombre=?,poblacion=?,saldo=? where id=?", [nombre, poblacion, saldo, modificar])
      .then(rows => {
        res.redirect('/users/listado');

      })
  })
});

module.exports = router;