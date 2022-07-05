const path= require('path');
exports.get404=(req,res,next)=>{
    console.log("Page not found");
    res.status(404).render('404',{title:'404'});
};