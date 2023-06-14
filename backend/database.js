// Este archivo vamos a tener la configuración de la base de datos 
// y la lógica relacionada.

const sql = require('mssql');

// Configuración de la conexión a la base de datos
const config = {
  user: 'sa',
  password: 'root',
  server: 'localhost',
  database: 'WebServices',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function insertarCliente(cedula, nombre, primerApellido,
segundoApellido, fechaNacimiento, telefono, email, sexo, estado) {
    try {
        // Creamos el pool
        const pool = await sql.connect(config);

        await pool.request()
        .input('cedula', sql.Int, cedula)
        .input('nombre', sql.VarChar(30), nombre)
        .input('primerApellido', sql.VarChar(30), primerApellido)
        .input('segundoApellido', sql.VarChar(30), segundoApellido)            
        .input('telefono', sql.Int, telefono)
        .input('email', sql.VarChar(60), email)
        .input('fechaNacimiento', sql.Date, fechaNacimiento)
        .input('sexo', sql.VarChar(1), sexo)
        .input('estado', sql.Bit, estado)
        .query('INSERT INTO Cliente VALUES (@cedula, @nombre, @primerApellido, @segundoApellido, @telefono, @email, @fechaNacimiento, @sexo, @estado)');
        pool.close();
    } catch (error) {
        console.error('Error al insertar los datos del Cliente.', error)
    }
}





// Exportamos las funciones.
module.exports = {
    insertarCliente
};
