const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB Connection (Optional for this assignment, but setting it up for future use)
// mongoose.connect('mongodb://localhost:27017/zopeInsurance', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("Connected to MongoDB"))
//     .catch(err => console.error("Could not connect to MongoDB", err));

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Zope Insurance Company | Home' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us | Zope Insurance Company' });
});

app.get('/services', (req, res) => {
    res.render('services', { title: 'Our Services | Zope Insurance Company' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us | Zope Insurance Company' });
});

app.post('/contact', (req, res) => {
    // In a real application, you would save this to MongoDB here
    const { name, email, message } = req.body;
    console.log(`Received message from ${name} (${email}): ${message}`);
    res.render('contact', { title: 'Contact Us | Zope Insurance Company', success: "Thank you for reaching out! We'll get back to you soon." });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
