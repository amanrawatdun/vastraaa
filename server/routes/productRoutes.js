const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct, getNewArrivalProducts, getSaleProducts, getProductByBrand, getProductBySearch, getProductByPages } = require('../controllers/productController');
const { authMiddleware,  adminMiddleware } = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');
const router = express.Router();

router.get('/' , getProducts);
router.post('/', authMiddleware,  adminMiddleware,  upload.single('image') , createProduct);
router.patch('/update/:id' ,upload.single('image'), updateProduct)
router.delete('/delete/:id',  deleteProduct)
router.get('/newarival', getNewArrivalProducts)
router.get('/saleproduct' , getSaleProducts)
router.get('/brand',getProductByBrand)
router.get('/search' , getProductBySearch)

router.get('/loadmore' , getProductByPages);

module.exports =router;
