require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB Connection (Use local by default)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pccoe-website';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB (pccoe-website)'))
  .catch(err => {
    console.error('Failed to connect to MongoDB, attempting to start app anyway...');
    console.error(err);
  });

// Inquiry Model
const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  course: { type: String, required: true },
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const Inquiry = mongoose.model('Inquiry', inquirySchema);

// Routes
app.get('/', (req, res) => {
  res.render('index', { successMsg: req.query.successMsg || null, errorMsg: req.query.errorMsg || null });
});

app.post('/api/inquiry', async (req, res) => {
  try {
    const { name, email, phone, course, message } = req.body;

    // Check if connected to DB
    if (mongoose.connection.readyState !== 1) {
      console.log('Mocking db save: ', req.body);
      return res.redirect('/?successMsg=Your inquiry has been received (DB unavailable, mocked saving)');
    }

    const newInquiry = new Inquiry({ name, email, phone, course, message });
    await newInquiry.save();

    res.redirect('/?successMsg=Your inquiry has been received successfully! We will contact you soon.');
  } catch (error) {
    console.error('Error saving inquiry:', error);
    res.redirect('/?errorMsg=An error occurred while submitting your inquiry. Please try again.');
  }
});

// Admin Route to view inquiries (Simple)
app.get('/admin/inquiries', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.send('<h2>Database not connected. Cannot fetch inquiries.</h2>');
    }
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    let html = '<h2>Admission Inquiries</h2><table border="1" cellpadding="10" style="border-collapse: collapse; font-family: sans-serif;"><tr><th>Name</th><th>Email</th><th>Phone</th><th>Course</th><th>Message</th><th>Date</th></tr>';
    inquiries.forEach(inq => {
      html += `<tr><td>${inq.name}</td><td>${inq.email}</td><td>${inq.phone}</td><td>${inq.course}</td><td>${inq.message}</td><td>${new Date(inq.createdAt).toLocaleString()}</td></tr>`;
    });
    html += '</table><br><a href="/">Back to Home</a>';
    res.send(html);
  } catch (err) {
    res.status(500).send('Error fetching data');
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running beautifully on http://localhost:${PORT}`);
});
