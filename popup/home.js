document.addEventListener('DOMContentLoaded', function() {
    obtenerCuentas();

    function obtenerCuentas() {
        fetch('http://ec2-18-222-218-203.us-east-2.compute.amazonaws.com:3000/accounts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.cuentas) {
                mostrarCuentas(data.cuentas);
            } else {
                console.error('Error al obtener las cuentas:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    function mostrarCuentas(cuentas) {
        const cuentasContainer = document.getElementById('cuentas-container');
        const cuentasList = document.getElementById('cuentas-list');
        cuentasList.innerHTML = ''; // Limpia la lista anterior

        cuentas.forEach(cuenta => {
            const listItem = document.createElement('li');
            listItem.textContent = `Usuario: ${cuenta.user}, Contraseña: ${cuenta.password}`;
            cuentasList.appendChild(listItem);
        });

        cuentasContainer.style.display = 'block';
    }
});
