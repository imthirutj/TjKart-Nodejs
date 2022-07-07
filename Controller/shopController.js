
exports.getOrder=(req,res,next)=>{
res.render('Orders',{title:'My Orders'});
}


const getProdMod=require('../Model/productModel');
exports.getProdDet=(req,res,next)=>{
    const prodId =req.params.prodId;
 
    console.log('Details :-Product Id from param is '+prodId);

    getProdMod.findById(prodId,pp=>{
      
       // res.render('DetailedProd',{title:'Product Details', prod:pp});
       console.log(pp);
       res.render('DetailedProd',{title:'Product Details', prod:pp})
    });

}

const kartMod= require('../Model/kartModel');
exports.addkart=(req,res,next)=>{
    const ProdId = req.body.prodId;


    const qty    =req.body.qty;
    console.log("The Prod Id for kart is "+ProdId);

    getProdMod.findById(ProdId,pp=>{
        
        
        const kMod = new kartMod();
        console.log("Price of this product is "+pp.Price);
        kMod.saveProdInKarts(pp.Id,pp.Price,pp.PName,qty);
        res.redirect('/Listproducts');
     });


};

exports.getkart=(req,res,next)=>{

    kartMod.getkarts(kartProds=>{
        res.render('cart',{title:'Cart Page',kart:kartProds});

    })
    
}


exports.delkart=(req,res,next)=>{

    kartMod.deletekart(req.params.kId,(status)=>{
        console.log(status);

    });
    res.redirect('/cart');
}