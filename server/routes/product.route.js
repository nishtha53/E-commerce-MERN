const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth")

//controllers
//const productController = require("../controllers/product.controller");
const {addProduct,getAllProducts,updateProduct,deleteProduct} = require('../controllers/product.controller')
 
router.get('/getAllProducts',getAllProducts);
router.post('/addProduct',auth,addProduct);
router.put('/updateProduct/:id',auth,updateProduct);
router.delete('/deleteProduct/:id',auth,deleteProduct);


//exporting
module.exports = router;
