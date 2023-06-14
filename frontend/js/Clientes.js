// Funcion para cargar los clientes a la tabla.
function cargarTablaClientes() {
    fetch('/obtenerClientes')
    .then(response => response.json())
    .then(clientes => {        
        clientes.forEach(element => {        
            const tbody = document.querySelector('.tabla__datos');

            const tr = document.createElement('tr');
            tr.className = 'tabla__fila';

            const tdCedula = document.createElement('td');
            tdCedula.className = 'tabla__dato';
            tdCedula.textContent = element.cedula;
            tdCedula.setAttribute("data-label", "Cédula:");
            
            const tdNombreCompleto = document.createElement('td');
            tdNombreCompleto.className = 'tabla__dato';
            tdNombreCompleto.textContent = `${element.nombre} ${element.primerApellido} ${element.segundoApellido}`;            
            tdNombreCompleto.setAttribute("data-label", "Nombre Completo:");

            const tdTelefono = document.createElement('td');
            tdTelefono.className = 'tabla__dato';
            tdTelefono.textContent = element.telefono;
            tdTelefono.setAttribute("data-label", "Teléfono:");

            const tdEmail = document.createElement('td');
            tdEmail.className = 'tabla__dato';
            tdEmail.textContent = element.email;
            tdEmail.setAttribute("data-label", "Email:");

            const tdFechaNacimiento = document.createElement('td');
            tdFechaNacimiento.className = 'tabla__dato';
            const fechaRecibida = element.fechaNacimiento;
            const fecha = new Date(fechaRecibida);
            const year = fecha.getUTCFullYear();
            const month = String(fecha.getUTCMonth() + 1).padStart(2, "0");
            const day = String(fecha.getUTCDate()).padStart(2, "0");
            const fechaFormateada = `${year}-${month}-${day}`;
            tdFechaNacimiento.textContent = fechaFormateada;
            tdFechaNacimiento.setAttribute("data-label", "Fecha de Nacimiento:");

            const tdSexo = document.createElement('td');
            tdSexo.className = 'tabla__dato';
            tdSexo.textContent = element.sexo;
            tdSexo.setAttribute("data-label", "Sexo:");
            
            const tdEstado= document.createElement('td');
            tdEstado.className = 'tabla__dato';
            if (element.estado) {
                tdEstado.textContent = 'Activo';
            } else {
                tdEstado.textContent = 'Inactivo';
            }
            tdEstado.setAttribute("data-label", "Estado:");


            tr.appendChild(tdCedula);
            tr.appendChild(tdNombreCompleto);
            tr.appendChild(tdTelefono);
            tr.appendChild(tdEmail);
            tr.appendChild(tdFechaNacimiento);
            tr.appendChild(tdSexo);
            tr.appendChild(tdEstado);

            tbody.appendChild(tr);
        });
        
    })
    .catch(error => {
        console.error(error);
    });
}

// Funcion para agregar un cero inicial a los componentes de 
// la fecha (mes y día) que tienen un solo dígito.
function padZero(num) {
    return num.toString().padStart(2, "0");
}

// Llamamos a las funciones.
cargarTablaClientes();