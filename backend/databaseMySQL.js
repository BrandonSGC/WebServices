// Este archivo vamos a tener la configuración de la base de datos 
// MySQL y la lógica relacionada.

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webservices'
});

const conectar = () => {
    connection.connect(err => {
        if(err) throw err
        console.log('Conectado a la DB');
    });
};

async function insertarClienteMySQL(cedula, nombre, primerApellido, segundoApellido, fechaNacimiento, telefono, email, sexo, estado) {
    try {
        connection.connect();
        
        // Se especifica la consulta SQL con marcadores de posición "?" para los valores.
        const query = 'INSERT INTO Cliente (cedula, nombre, primerApellido, segundoApellido, telefono, email, fechaNacimiento, sexo, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        // Se proporciona un arreglo values con los valores correspondientes en el mismo orden.
        const values = [cedula, nombre, primerApellido, segundoApellido, telefono, email, fechaNacimiento, sexo, estado];

        connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error al insertar los datos del Cliente:', error);
        } else {
            console.log('Datos del Cliente insertados correctamente');
        }
        });
        connection.end();
    } catch (error) {
        console.error('Error al insertar los datos del cliente:', error);
    }
    
}


module.exports = {
    insertarClienteMySQL,
    conectar,
}