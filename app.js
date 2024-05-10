const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL database connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Admin@123',
    database: 'user2_account', 
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return; 
    }
    console.log('Connected to MySQL database');
});

// Serve login.html for the login page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

// Serve signup.html for the signup page
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

// Signup endpoint
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // Example query (insert new user into the database)
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';

    // Execute the query
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ error: 'Error signing up', details: err.message });
            return;
        }

        res.json({ message: 'Signup successful' });
    });
});
app.get('/signup.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile(__dirname + '/signup.js');
});


// Login endpoint
app.post('/login', (req, res) => {
    // Add your login logic here
    const { username, password } = req.body;

    // Example query (check if the user exists in the database)
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

    // Execute the query
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ error: 'Error logging in', details: err.message });
            return;
        }

        if (results.length > 0) {
            res.json({ message: 'Login successful' });

        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});