$(document).ready(function () {
    $('#loginForm').submit(function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Extract username and password from form inputs
        const username = $('#username').val();
        const password = $('#password').val();

        // Send a POST request to the server
        $.ajax({
            url: '/login',
            method: 'POST',
            data: { username, password },
            success: function (data) {
                // Display an alert on successful login
                alert('Login successful!');
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                // Handle login failure
                alert('Login failed. Please check your credentials.');
            }
        });
    });
});
