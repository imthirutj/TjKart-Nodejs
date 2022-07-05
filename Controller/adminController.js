

const productModel=require('../Model/productModel');
exports.getProduct=(req,res,next)=>{
    productModel.getProduct((li)=>{
        res.render('admin/AdminProducts',{list:li,
                                    title:'ListProduct'});
                                   
    });
}