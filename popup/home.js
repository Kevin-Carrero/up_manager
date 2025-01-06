document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('authToken'); // Obtener el token

    if (!token) {
        alert('No has iniciado sesión');
        window.location.href = 'popup.html'; // Redirigir a la página de inicio de sesión si no hay token
        return;
    }

    obtenerCuentas(token);

    function obtenerCuentas(token) {
        fetch('http://ec2-18-220-129-240.us-east-2.compute.amazonaws.com:3000/accounts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Añadir el token en los headers
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
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
        const cuentasContainer = document.getElementById('accounts-container');
        const cuentasList = document.getElementById('accounts-list');
        
        if (!cuentasContainer || !cuentasList) {
            console.error("No se encontraron los elementos 'accounts-container' o 'accounts-list' en el DOM");
            return;
        }

        cuentasList.innerHTML = ''; // Limpia la lista anterior

        cuentas.forEach(cuenta => {
            const listItem = document.createElement('li');
            listItem.textContent = `Usuario: ${cuenta.user}, Contraseña: ${cuenta.password}`;
            cuentasList.appendChild(listItem);
        });

        cuentasContainer.style.display = 'block';
    }
});
