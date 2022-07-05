
const fs = require('fs');
const path = require('path');
const pa=path.join(__dirname,'..','Data/ProductDetails.json');
var multer = require('multer');

const uploadImg = multer({dest: 'uploads/'});

const readProducts=(cb)=>{
    fs.readFile(pa,(err,data)=>{
        if(err){
            console.log('cannot read File:\n'+err);
            return [];
        }
        else{
            cb(JSON.parse(data));
        }

    })
}

module.exports=class Product{
    
    constructor(pname,desc,qty,price,catg,pimag,pimageUrl){

        console.log("constructor called");
        
        readProducts((rp)=>{
            console.log("There are "+rp.length+"products available");
            
        this.Id=(rp.length+1);
          
        this.PName=pname;
        console.log("this current product: "+this.PName);
        this.Desc=desc;
        this.Quantity=qty;
        this.Price=parseFloat(price);
        this.Catg=catg;
        this.Pimag=pimag;
        this.PimageUrl=pimageUrl;

        console.log("this current Image name: "+this.Pimag);
        });
        

        
       // this.Pimag=pimage;
      
       
        
    }

    saveProduct(){
        //get all existing prodduct and add to current product
        console.log("save process started");
        readProducts((prodOb)=>{
            prodOb.push(this);
            

            fs.writeFile(pa,JSON.stringify(prodOb),(err)=>{
                if(err){
                console.log('cannot Write\n'+err);
                }else{
                    console.log("written successfully");
                }
            });

        });

    }

    static getProduct(cb){
        readProducts(cb);
    }

    static findById(id,cb){
        readProducts(prods=>{
            const product = prods.find(p=>p.Id==id);
            console.log('this prod Id '+product.Id);
           cb(product);

        })
    }
}