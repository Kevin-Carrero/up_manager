import { login } from '../services/api.js';

document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('authToken');
    if (token){
        window.location.href = "home.html";
    } else {
        document.getElementById('login-form').addEventListener('submit', function(event) {
            event.preventDefault();
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
        
            login(email, password)
            .then(data => {
                if (data.message === 'Inicio de sesión exitoso') {
                    localStorage.setItem('authToken', data.token);
                    window.location.href = "home.html"
                } else {
                    alert(data.message);
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }
})