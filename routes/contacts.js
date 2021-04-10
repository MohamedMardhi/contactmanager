const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @desc    Get all users contacts
// access   PRIVATE
router.get('/', (req, res) => {
    res.send('get all contacts');
});

// @route   POST api/contacts
// @desc    Add new contacts
// access   PRIVATE
router.post('/', (req, res) => {
    res.send('add contact');
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