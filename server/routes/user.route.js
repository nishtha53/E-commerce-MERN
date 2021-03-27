const express = require('express');
const router = express.Router();

//controllers 
const {signin,signup} = require('../controllers/user.controller')

//signup router
router.post('/signup',signup);

//signin router
router.post('/signin',signin)


//exporting
module.exports = router