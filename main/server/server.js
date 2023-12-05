const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001; // Choose a port for your server
// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: 'eplus524@outlook.com', // Replace with your Gmail email address
        pass: 'Katie1990.', // Replace with your Gmail password
    },
});

// Endpoint for handling registration and sending verification email
app.post('/register', async (req, res) => {
    const {
        email,
        username,
        password
    } = req.body;

    // You should implement your own logic for generating a verification token
    const verificationToken = 'generate_your_verification_token_here';

    // Email content
    const mailOptions = {
        from: 'eplus524@outlook.com', // Replace with your Gmail email address
        to: email,
        subject: 'Verify Your Email',
        text: `Click the following link to verify your email: http://localhost:3000/verify/${verificationToken}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        // You can now save the user data and verification token to your database
        // For simplicity, we'll simulate a database by storing in-memory
        const userData = {
            email,
            username,
            password,
            verificationToken,
        };

        // Your database logic goes here (e.g., MongoDB, MySQL, etc.)
        // For now, let's just log the user data
        console.log('User Data:', userData);

        res.json({
            success: true
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to send verification email'
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});