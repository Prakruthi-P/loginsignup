$(document).ready(function () {
    $('#signupForm').submit(function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Extract username and password from form inputs
        const username = $('#username').val();
        const password = $('#password').val();

        // Send a POST request to the server
        $.ajax({
            url: '/signup',
            method: 'POST',
            data: { username, password },
            success: function (data) {
                console.log(data);
                // Handle signup success, you can redirect to login page or show a success message
                
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                // Handle signup failure, you can show an alert or other error handling
            }
        });
    });
});
