const express = require('express');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken')
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const config = require('config');

// @route   POST api/users
// @desc    Register a user
// access   PUBLIC
router.post('/',[
    check('name', 'name is required')
    .not()
    .isEmpty(),
    check('email', 'please enter a valid e-mail').isEmail(),
    check('password', 'please enter a password with at least 8 charachters').isLength({min: 8})
    ],
     async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {name, email, password} = req.body;
        try {
            let user = await User.findOne({email: email});
            if(user){
                return res.status(400).json({msg: 'we have a user registred with this e-mail, you forgot your password !'})
            }
            user = new User({
                name,
                email,
                password
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            // jwt config
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

            
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Something goes wrong with our server')
        }

});

module.exports = router;