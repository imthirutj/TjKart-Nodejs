
const path=require('path');
exports.getHome=(req,res,next)=>{
    res.status(200).render('home',{title:"Home"});
}