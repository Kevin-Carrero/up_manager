document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    fetch('http://ec2-18-222-218-203.us-east-2.compute.amazonaws.com:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login exitoso') {
            alert('Inicio de sesión exitoso');
            window.location.href = "home.html"
            //mostrarCuentas(data.account);
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});