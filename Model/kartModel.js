const { json } = require('express');
const fs = require('fs');
const path = require('path');
const pa=path.join(__dirname,'..','Data/kartDetails.json');


const readProdInKart=(cb)=>{
    fs.readFile(pa,(err,data)=>{
        if(err){
            console.log('cannot read File from kart:\n'+err);
            return [];
        }
        else{
            cb(JSON.parse(data));
        }

    })
}
module.exports=class kart{
    constructor(){
      
        this.KartProducts=[];
        
        this.totalPrice=0;

    }

  
    saveProdInKarts(Id,price,name,qty){
        
        readProdInKart(prods=>{
            qty=parseFloat(qty);
            if(prods.length===0){
            prods.push(this);
            }
          console.log(prods);
          console.log('===============================');
            Id=parseInt(Id);
          const prodObj={"Id":Id,"Price":price,"Name":name, "Quantity":qty};

         

         const myId= prods[0].KartProducts.find(p=>p.Id === Id);
         
         //Hey this product is present in kart already, what should i do?
         //myId is there
         console.log("MyId is "+myId);
         
         if(myId !== undefined){
            const inp=prods[0].KartProducts.findIndex(p=>p.Id === Id);
            
            console.log("Index is "+inp);

            prods[0].KartProducts[inp].Price=price;
            prods[0].KartProducts[inp].Name=name;
            prods[0].KartProducts[inp].Quantity+=qty;
            console.log('Present quantity of Id '+myId.Id+' is '+prods[0].KartProducts[inp].Quantity);

         }
         else{
          console.log("The new kart product  "+myId);
          
          prods[0].KartProducts.push(prodObj);
          console.log(prods[0].KartProducts);
         }

         
         //total Price
         var tprice=null;
         for(var tp of prods[0].KartProducts){
            tprice+=tp.Price* tp.Quantity;
         }
            console.log("Total Price "+tprice);
         prods[0].totalPrice=tprice;
         console.log('-=-=-=-='+prods);
   


            fs.writeFile(pa,JSON.stringify(prods),err=>{
                if(err){
                    console.log("cannot write in kart");
                }
                else{
                    console.log("written successfully in kart");
                }
            });

                 //update qty in product det
        const ProdMod = require('../Model/productModel');
        const pat=path.join(__dirname,'..','Data/ProductDetails.json');
        ProdMod.getProduct(prodOb=>{

            const edIndex=prodOb.findIndex(p=>p.Id===Id);
            const upProd=[...prodOb];
            upProd[edIndex].Quantity-=qty;
           // console.log(upProd);

            fs.writeFile(pat,JSON.stringify(upProd),(err)=>{
                if(err){
                console.log('cannot Write for edited products\n'+err);
                }else{
                    console.log("for edit, written successfully");
                }
            });

        });
        });

    }//end save

    static getkarts(cb){
        readProdInKart(cb);
    }

    static deletekart(Id,cb){
        readProdInKart(kProds=>{
            var delProds=null;
          

            var IndKprod=kProds[0].KartProducts.findIndex(p=>p.Id=== parseInt(Id));
            console.log("index"+IndKprod);
            
            kProds[0].KartProducts.splice(IndKprod,1);
            console.log(kProds);

            //price
            var tprice=null;
         for(var tp of kProds[0].KartProducts){
            tprice+=tp.Price* tp.Quantity;
         }
         kProds[0].totalPrice=tprice;

            //check
            for(var v of kProds){
                console.log(v.KartProducts);
                }

            const upKprod=[...kProds];
            fs.writeFile(pa,JSON.stringify(upKprod),err=>{
                if(err){
                    console.log("cannot write for delete item in kart");
                }
                else{
                    console.log("delete for item kart");
                    cb("Delete Success kart");
                }
            })
            
            
        })

    }
}