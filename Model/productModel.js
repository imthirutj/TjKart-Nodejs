
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
    
    
    constructor(pId,pname,desc,qty,price,catg,pimag,pimageUrl){

        console.log("constructor called");
        
       
            
        if(pId !==null){
            this.Id=parseInt(pId);
        }
          console.log("The product Id is"+pId)
        this.PName=pname;
        console.log("this current product: "+this.PName);
        this.Desc=desc;
        this.Quantity=parseInt(qty);
        this.Price=parseFloat(price);
        this.Catg=catg;
        this.Pimag=pimag;
        this.PimageUrl=pimageUrl;

        console.log("this current Image name: "+this.Pimag);
    
        

        
       // this.Pimag=pimage;
      
       
        
    }

    saveProduct(){
        //get all existing prodduct and add to current product
        console.log("save process started");


        readProducts((prodOb)=>{
            
        if(this.Id){
           
            const edIndex=prodOb.findIndex(p=>p.Id==this.Id);
            const upProd=[...prodOb];
            upProd[edIndex]=this;

            fs.writeFile(pa,JSON.stringify(upProd),(err)=>{
                if(err){
                console.log('cannot Write for edited products\n'+err);
                }else{
                    console.log("for edit, written successfully");
                }
            });

        }
         else{

           
             console.log("There are "+prodOb.length+"products available");
            this.Id=(prodOb.length+1);
            prodOb.push(this);
            fs.writeFile(pa,JSON.stringify(prodOb),(err)=>{
                if(err){
                console.log('cannot Write\n'+err);
                }else{
                    console.log("written successfully");
                }
            });
        }//end else

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

        });
    }

    static deleteProdFunc(id,cb){

        readProducts(prods=>{
           const indProd=prods.findIndex(p=>p.Id===id);
           
          
           prods=prods.filter(p=>p.Id!==parseInt(id));

           console.log("id passed to delete is "+id);
           
           const updProd=[...prods];
           console.log(updProd);
           fs.writeFile(pa,JSON.stringify(updProd),(err)=>{
            if(err){
            console.log('cannot Write deleted\n'+err);
            }else{
                console.log("deleted written successfully");
                cb("DELETED SUCCESS");
            }
            });


        });
    }
}