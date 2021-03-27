const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth")

const {placeOrder,myOrder} = require('../controllers/order.controller');



router.get('/myOrder',auth,myOrder);
router.post('/placeOrder',auth,placeOrder);

//export
module.exports = router;