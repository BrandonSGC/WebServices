const express = require("express");
const path = require("path");
const app = express();

// Funciones de las DB.
const {
  insertarClienteSQLServer,
  obtenerClientesSQLServer,
} = require("./databaseSQLServer.js");
const { insertarClienteMySQL } = require("./databaseMySQL.js");

const PUERTO = 3800;

// Server.
app.listen(PUERTO, () => {
  console.log(`El servidor está escuchando en el puerto ${PUERTO}...`);
});

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Configurar la entrega de archivos estáticos.
app.use(express.static(path.join(__dirname, "../frontend")));

// Routing.

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/html/index.html"));
});

app.post("/crearCliente", async (req, res) => {
  try {
    // Accedemos a los datos enviados del formulario.
    const cedula = req.body.cedula;
    const nombre = req.body.nombre;
    const primerApellido = req.body.primerApellido;
    const segundoApellido = req.body.segundoApellido;
    const fechaString = req.body.fechaNacimiento;
    const [year, month, day] = fechaString.split("-");
    const fecha = new Date(year, month - 1, day);
    const telefono = req.body.telefono;
    const email = req.body.email;
    const sexo = req.body.sexo;
    const estado = req.body.estado === "0" ? false : true;

    // Insertar datos en DBs.
    await insertarClienteSQLServer(
      cedula,
      nombre,
      primerApellido,
      segundoApellido,
      fecha,
      telefono,
      email,
      sexo,
      estado
    );
    await insertarClienteMySQL(
      cedula,
      nombre,
      primerApellido,
      segundoApellido,
      fecha,
      telefono,
      email,
      sexo,
      estado
    );

    res.send(`Datos guardados exitósamente.`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al guardar los datos.");
  }
});

app.get("/obtenerClientes", async (req, res) => {
  try {
    const clientes = await obtenerClientesSQLServer();
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los datos del cliente.");
  }
});