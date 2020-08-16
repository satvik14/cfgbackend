const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const Videos = require('../models/Videos');
router.post(
    '/',
    [
      check('c_id', 'Please enter valid c_id').not().isEmpty(),
      check('video', 'Please include a video link').not().isEmpty(),
      
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { c_id,video } = req.body;

      try {
        
        
       
        videos = new Videos({
         
          c_id,
          video,
          
        });
        // const salt = await bcrypt.genSalt(10);
        // user.password = await bcrypt.hash(password, salt);
        await videos.save();
        const payload = {
          user: {
            id: videos.c_id,
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
  