
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config(); 
const app = express();


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));  
app.use(cors());  


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB connection error:', err));


const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    subject: String,
    message: String,
    submittedAt: { type: Date, default: Date.now }
});


const Contact = mongoose.model('Contact', contactSchema);


const reviewSchema = new mongoose.Schema({
    name: String,
    email:String,
    experience: String,
    rating: Number,
    approved: { type: Boolean, default: false }, 
    submittedAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);



app.post('/submit-form', async (req, res) => {
    const { name, email, number, subject, message } = req.body;

  
    if (!name || !email || !number || !subject || !message) {
        return res.status(400).send('All fields are required.');
    }

   
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        return res.status(400).send('Invalid email address.');
    }

    const numberPattern = /^[0-9]+$/;
    if (!numberPattern.test(number)) {
        return res.status(400).send('Phone number should contain only digits.');
    }

    try {
        
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).send('Message saved successfully!');
    } catch (error) {
        res.status(500).send('Failed to save message.');
    }
});


app.get('/contact-info', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ submittedAt: -1 }); 
        res.status(200).json(contacts);  
    } catch (error) {
        res.status(500).send('Failed to retrieve contact information.');
    }
});


app.delete('/contact-info/:id', async (req, res) => {
    try {
        const contactId = req.params.id; 
        const deletedContact = await Contact.findByIdAndDelete(contactId); 
        if (!deletedContact) {
            return res.status(404).send('Contact not found.');
        }

        res.status(200).send('Contact deleted successfully.');
    } catch (error) {
        res.status(500).send('Failed to delete contact.');
    }
});


app.post('/submit-review', async (req, res) => {
    const { name,email, experience, rating } = req.body;

    
    if (!name ||!email|| !experience || !rating) {
        return res.status(400).send('All fields are required.');
    }

  
    if (rating < 1 || rating > 5) {
        return res.status(400).send('Rating must be between 1 and 5.');
    }

    try {
       
        const review = new Review({
            name,
            email,
            experience,
            rating,
            approved: false 
        });
        await review.save();
        res.status(201).send('Review submitted successfully!');
    } catch (error) {
        res.status(500).send('Failed to submit review.');
    }
});


app.get('/admin/reviews', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ submittedAt: -1 }); 
        res.status(200).json(reviews);  
    } catch (error) {
        res.status(500).send('Failed to retrieve reviews.');
    }
});


app.post('/admin/approve-review/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).send('Review not found.');
        }

 
        review.approved = true;
        await review.save();

        res.status(200).send('Review approved successfully.');
    } catch (error) {
        res.status(500).send('Failed to approve review.');
    }
});


app.get('/reviews', async (req, res) => {
    try {
       
        const reviews = await Review.find({ approved: true }).sort({ submittedAt: -1 });
        res.status(200).json(reviews);  
    } catch (error) {
        res.status(500).send('Failed to retrieve reviews.');
    }
});

app.delete('/reviews/:id', async (req, res) => {
    try {
       
        const reviewId = req.params.id;

        const deletedReview = await Review.findByIdAndDelete(reviewId);

 
        if (!deletedReview) {
            return res.status(404).send('Review not found.');
        }

     
        res.status(200).send('Review deleted successfully.');
    } catch (error) {
        res.status(500).send('Failed to delete review.');
    }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
