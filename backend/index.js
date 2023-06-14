// Importamos express.
const express = require("express");
const path = require('path');
const app = express();

// Constante del Puerto a utilizar.
const PUERTO = 3000;

const { insertarCliente } = require('./database.js')

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Hacemos escuchar al servidor.
app.listen(PUERTO, () => {
    console.log(`El servidor está escuchando en el puerto ${PUERTO}...`);
});

// Configurar la entrega de archivos estáticos.
app.use(express.static(path.join(__dirname, '../frontend')));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/index.html'));
});


// Insertar datos del cliente
app.post('/crearCliente', async (req, res) => {
    // Accedemos a los datos enviados del formulario.
    const cedula = req.body.cedula
    const nombre = req.body.nombre
    const primerApellido = req.body.primerApellido
    const segundoApellido = req.body.segundoApellido
        
    // Accedemos a los datos enviados desde el formulario
    // mediante el atributo name de los inputs.
    const fechaString = req.body.fechaNacimiento;
    // Obtener los componentes de la fecha
    const [year, month, day] = fechaString.split("-")
    // Crear un objeto Date válido para SQL Server
    const fecha = new Date(year, month - 1, day);
    const telefono = req.body.telefono;    
    const email = req.body.email;
    const sexo = req.body.sexo;
    const estado = req.body.estado === "0" ? false : true;

    console.log(cedula);
    console.log(nombre);
    console.log(primerApellido);
    console.log(segundoApellido); 
    console.log(telefono);
    console.log(fecha);
    console.log(email);
    console.log(sexo);
    console.log(estado);

    await insertarCliente(cedula, nombre, primerApellido, segundoApellido, fecha, telefono, email, sexo, estado);
    res.send(`Datos guardados exitósamente.`);
});