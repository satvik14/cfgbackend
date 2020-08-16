const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const Course = require('../models/course');
router.post(
    '/',
    [
      check('name', 'Please add name').not().isEmpty(),
      check('description', 'Please include a valid description').not().isEmpty(),
      check('author', 'Please add author').not().isEmpty(),
      
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { c_name, description , author,videos } = req.body;

      try {
        // let user = await User.findOne({ email });
        // if (user) {
        //   return res.status(400).json({ msg: 'User already exists' });
        // }
        
        c_id=Course.count()+1;
        course = new Course({
          c_name,
          c_id,
          description,
          author,
          
        });
        // const salt = await bcrypt.genSalt(10);
        // user.password = await bcrypt.hash(password, salt);
        await course.save();
        const payload = {
          user: {
            id: coourse.c_id,
          },
        };
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          {
            expiresIn: 360000,
          },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
 
  module.exports = router;
  