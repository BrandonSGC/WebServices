document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const crearClienteDisplay = document.querySelector('.crearCliente__display');
    const formularioClientes = document.querySelector('#formularioClientes');
    const cedula = document.querySelector('#cedula');
    const nombre = document.querySelector('#nombre');
    const primerApellido = document.querySelector('#primerApellido');
    const segundoApellido = document.querySelector('#segundoApellido');
    const fechaNacimiento = document.querySelector('#fechaNacimiento');
    const telefono = document.querySelector('#telefono');
    const email = document.querySelector('#email');
    const sexo = document.querySelector('#sexo');
    const estado = document.querySelector('#estado');
    const btnCrearCliente = document.querySelector('#btnCrearCliente');
    

    cargarTablaClientes();

    // Eventos
    btnCrearCliente.addEventListener('click', (event) => {
        // Previmos el envio del formulario.
        event.preventDefault();
    
        // Validamos el formulario.
        validarFormulario();    
    });

    
    // Funciones
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

    function validarFormulario() {
        // Validar que los campos no estén vacíos.
        if (
            cedula.value === "" ||
            nombre.value === "" ||
            primerApellido.value === "" ||
            segundoApellido.value === "" ||
            fechaNacimiento.value === "" ||
            telefono.value === "" ||
            email.value === "" ||
            sexo.value === "" ||
            estado.value === ""
        ) {
            // Creamos la alerta.
            const p = document.createElement('p');
            p.className = 'crearCliente__alerta';
            p.textContent = 'Por favor, complete todos los campos.'        
            crearClienteDisplay.appendChild(p);
            setTimeout(() => {
                p.remove();
            }, 3000) ;
            // Detenemos el envío del formulario si hay campos vacíos.
            return;
        }
    }
});