
const express=require('express');
const router= express.Router();
const multer=require('multer');
const path = require('path');

const ProdCont=require('../Controller/ProductsController');
const admCont=require('../Controller/adminController');



router.get('/addProducts',ProdCont.addProductForm);
router.get('/Listproducts',ProdCont.getProduct);
router.post('/Listproducts',ProdCont.upload.single('pimage'), ProdCont.postProduct);

router.get('/adminProducts',admCont.getProduct);
router.get('/admin/editProductForm/:pId',admCont.editProd);
router.post('/admin/editproduct',admCont.postEditProd);
router.get('/admin/deleteProduct/:pId',admCont.deleteProd);

module.exports=router;
