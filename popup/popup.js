document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('authToken');
    if (token){
        window.location.href = "home.html";
    } else {
        document.getElementById('login-form').addEventListener('submit', function(event) {
            event.preventDefault();
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
        
            fetch('http://ec2-18-220-129-240.us-east-2.compute.amazonaws.com:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password })
            })
            .then(response => response.json())
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