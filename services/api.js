import config from './config.js';

// Función para manejar el inicio de sesión
export function login(email, password) {
    return fetch(`${config.ec2Url}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.json());
}

// Función para obtener las cuentas
export function getAccounts(token) {
    return fetch(`${config.ec2Url}/accounts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json());
}

//Función para guardar una pagina
export function addPage(url, icon, token){
    return fetch(`${config.ec2Url}/addPage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ${token}'
        },
        body: JSON.stringify({url: url, icon: icon })
        })
        .then(response => response.json());
}
