const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files (index.html, style.css)

// MongoDB Connection
// Replace with your MongoDB Atlas URI if needed: 'mongodb+srv://<username>:<password>@cluster0.exmt5.mongodb.net/portfolio?retryWrites=true&w=majority'
const mongoURI = 'mongodb://127.0.0.1:27017/portfolio';

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connection successful'))
    .catch(err => console.error('MongoDB connection error:', err));

// Schema layout for contact form
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// API Endpoint to handle contact form submission
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();
        
        res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
