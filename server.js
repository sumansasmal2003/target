require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configure Nodemailer transport
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Endpoint to send email
app.post('/send-email', (req, res) => {
    const { to, subject, html } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Failed to send email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

// Endpoint to send progress update email
app.post('/send-progress-email', (req, res) => {
    const { to, subject, html } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html // Use HTML content for styled email
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Failed to send progress update email');
        } else {
            console.log('Progress update email sent: ' + info.response);
            res.status(200).send('Progress update email sent successfully');
        }
    });
});

// Endpoint to send completion email
app.post('/send-completion-email', (req, res) => {
    const { to, subject, html } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html // Use HTML content for styled email
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Failed to send completion email');
        } else {
            console.log('Completion email sent: ' + info.response);
            res.status(200).send('Completion email sent successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
