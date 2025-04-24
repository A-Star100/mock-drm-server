const express = require('express');
const { spawn } = require('child_process');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');  // Serve index.html as the landing page
});

// Create an API endpoint for "/video"
app.get('/video', (req, res) => {
    const password = req.query.pass; // Set password variable to URL-encoded "pass" value, e.g "localhost:3000/video?pass=password123"
    if (!password) {
        return res.status(400).send('Missing password');
    }

  // Spawn OpenSSL child process that decrypts the file with the provided password and saves it in memory
    const openssl = spawn('openssl', [
        'enc',
        '-aes-256-cbc',
        '-d',
        '-pbkdf2',
        '-in', 'video.mp4.enc',
        '-pass', `pass:${password}`
    ]);

  // Set content type header so media players can recognize the decrypted stream
    res.setHeader('Content-Type', 'video/mp4');


  // Starts a pipe, and sends the decrypted stream through it to the response stream, what the client receives from the API endpoint, and adds event listeners for errors
    openssl.stdout.pipe(res);
    openssl.stderr.on('data', (data) => {
        console.error(`OpenSSL error: ${data}`);
    });

  // Checks if OpenSSL has closed unexpectedly and sends a 500 Internal Server Issue status code to the user
    openssl.on('close', (code) => {
        if (code !== 0) {
            console.error(`OpenSSL process exited with code ${code}`);
            res.status(500).end();
        }
    });
});

// Start the Express.js server on PORT, in this case 3000
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
