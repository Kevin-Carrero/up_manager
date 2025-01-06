import { getAccounts } from '../services/api.js'

document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('authToken'); // Obtener el token

    if (!token) {
        alert('No has iniciado sesión');
        window.location.href = 'popup.html'; // Redirigir a la página de inicio de sesión si no hay token
        return;
    }

    obtenerCuentas(token);

    function obtenerCuentas(token) {
        getAccounts(token)
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
            
            const userSpan = document.createElement('p');
            userSpan.textContent = cuenta.user;
        
            const passwordInput = document.createElement('input');
            passwordInput.type = 'password';
            passwordInput.value = cuenta.password;
            passwordInput.readOnly = true;
        
            listItem.appendChild(userSpan);
            listItem.appendChild(passwordInput);
            cuentasList.appendChild(listItem);
        });
        

        cuentasContainer.style.display = 'block';
    }

    function addAccount(){

    }
});
