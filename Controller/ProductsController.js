var multer=require('multer');
const path =require('path');


exports.addProductForm=(req,res,next)=>{
    res.render('addProdForm',{title:"Product Form",
                                });
}




const productModel=require('../Model/productModel');
var pimag=null;
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{

        cb(null,"Public/Image");
    },
    filename: (req,file,cb)=>{
        console.log('fileDet: '+file.originalname);
        pimag=Date.now()+ path.extname(file.originalname);

        cb(null,pimag);
    }
});
exports.upload=multer({storage:storage,});


exports.postProduct=(req,res,next)=>{
    const pname=req.body.pname;
    const desc=req.body.desc;
    const qty=req.body.qty;
    const price=req.body.price;
    const catg=req.body.category;
    const pimageUrl=req.body.pimageUrl;
    
    console.log('pimag:'+pimag);
    


    const prodObj = new productModel(pname,desc,qty,price,catg,pimag,pimageUrl);
    prodObj.saveProduct();
    console.log("This product saved");
    res.redirect('/ListProducts');



}

exports.getProduct=(req,res,next)=>{
    productModel.getProduct((li)=>{
        res.render('ListProducts',{list:li,
                                    title:'ListProduct'});
                                   
    });
}

