const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

// @route   GET api/contacts
// @desc    Get all users contacts
// access   PRIVATE
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
        res.json(contacts);
    } catch (err) {
        res.status(500).send('Something goes wrong with our server');
    }
});

// @route   POST api/contacts
// @desc    Add new contacts
// access   PRIVATE
router.post('/', [auth,[
    check('name', 'name is required')
    .not()
    .isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {name, email, phone, type} = req.body;
    try {
        const newContact = new Contact ({
            name,
            email,
            phone,
            type,
            user: req.user.id
        })
        const contact = await newContact.save();

        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Something goes wrong with our server');
    }
});

// @route   PUT api/contacts/:id
// @desc    Update contact
// access   PRIVATE
router.put('/:id', (req, res) => {
    res.send('update contact');
});

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// access   PRIVATE
router.delete('/:id', (req, res) => {
    res.send('delete contact');
});

module.exports = router;