const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');
const config = require('config');

// @route   GET api/auth
// @desc    Get logged in user
// access   PRIVATE
router.get('/', auth, async (req, res) => {
    try {
        // select('-password') we don't want password to be returned
        const user = await User.findOne(req.user.id).select('-password');
        res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server ERROR, please retry later')
    }
});

// @route   POST api/auth
// @desc    Auth user and get token
// access   PUBLIC
router.post('/', [
    check('email', 'Please include a valid e-mail').isEmail(),
    check('password', 'Password is required !').exists()
], async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {email, password} = req.body;
        try {
            let user = await User.findOne({email})
            if(!user){
                return res.status(400).json({msg: 'Invalid e-mail OR password'})
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) {
                return res.status(400).json({msg: 'Invalid e-mail OR password'})
            }
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 36000,
            }, (err, token)=> {
                if(err) throw err
                res.json({token})
            })
        } catch (error) {
            console.error(err.message)
            res.status(500).send('Server ERROR, please retry later')
        }
        
});

module.exports = router;