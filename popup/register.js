document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;

            fetch('http://ec2-18-222-218-203.us-east-2.compute.amazonaws.com:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.message === 'Usuario registrado exitosamente') {
                    window.location.href = 'login.html';
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }
});
