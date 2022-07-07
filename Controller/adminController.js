var multer=require('multer');
const path =require('path');

const productModel=require('../Model/productModel');
exports.getProduct=(req,res,next)=>{
    productModel.getProduct((li)=>{
        res.render('admin/AdminProducts',{list:li,
                                    title:'ListProduct'});
                                   
    });
}

const prodMod=require('../Model/productModel');

exports.editProd=(req,res,next)=>{
    const prodId=req.params.pId;
    console.log(prodId);
    prodMod.findById(prodId,edProd=>{
        console.log(edProd);
        res.render('admin/editProdForm',{title:'Edit Product', Prod:edProd});
       // res.redirect('/Listproducts');
    });

}


//for image
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

exports.postEditProd=(req,res,next)=>{
    
    const pId=req.body.pId;
    console.log("======Id fromvform is "+pId);
    const pname=req.body.pname;
    console.log("======name from form is "+pname);
    const desc=req.body.desc;
    const qty=req.body.qty;
    const price=req.body.price;
    const catg=req.body.category;
    const pimageUrl=req.body.pimageUrl;

    const prodObj = new prodMod(pId,pname,desc,qty,price,catg,pimag,pimageUrl);
    prodObj.saveProduct();

    res.redirect('/adminProducts');

}

const KartMod=require('../Model/kartModel'); 
const { stat } = require('fs');
exports.deleteProd=(req,res,next)=>{
    const pId=req.params.pId;
    prodMod.deleteProdFunc(pId,cb=>{
        console.log(cb);
    });
    KartMod.deletekart(pId,status=>{
        console.log(status);
    })
    res.redirect('/adminProducts');
}