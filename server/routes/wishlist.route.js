const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth")

const {addToWishlist,myWishlist} = require('../controllers/wishlist.controller');



router.get('/myWishlist',auth,myWishlist);
router.post('/addToWishlist',auth,addToWishlist);

//export
module.exports = router;