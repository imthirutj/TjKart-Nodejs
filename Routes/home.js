const express=require('express');
const router= express.Router();

const homeCont=require('../Controller/homeController');
const shopCont=require('../Controller/shopController');
router.get('/',homeCont.getHome);

router.get('/orders',shopCont.getOrder);
router.get('/product/:prodId',shopCont.getProdDet);

router.post('/add-to-kart',shopCont.addkart);
router.get('/cart',shopCont.getkart);

router.get('/delete-kart/:kId',shopCont.delkart);

module.exports=router;