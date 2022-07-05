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


    saveProdInKarts(Id,price,qty){
        readProdInKart(prods=>{
            qty=parseFloat(qty);
            if(prods.length===0){
            prods.push(this);
            }
          console.log(prods);
          console.log('===============================');

          const prodObj={"Id":Id,"Price":price, "Quantity":qty};

         
         const myId= prods[0].KartProducts.find(p=>p.Id === Id);
         
         //Hey this product is present in kart already, what should i do?
         
         
         if(myId !== undefined){
            const inp=prods[0].KartProducts.findIndex(p=>p.Id === Id);
            
            console.log("Index is "+inp);

            prods[0].KartProducts[inp].Price=price;
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


            fs.writeFile(pa,JSON.stringify(prods),err=>{
                if(err){
                    console.log("cannot write in kart");
                }
                else{
                    console.log("written successfully in kart");
                }
            })
        });

    }
}