console.log("welcome.. App started");

const http=require('http');
const express=require('express');
const bodyparser=require('body-parser');
const path =require('path');
var multer = require('multer');
var upload = multer();

const app = express();
app.use(express.static(path.join(__dirname,'Public')));
//app.use(upload.array()); 
//app.use(bodyparser.json());
app.use(express.urlencoded({extended: false}));

//set view engine
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine','ejs');


// '/' default page
//import home route
const home=require('./Routes/home');
app.use(home);




const admin=require('./Routes/admin');
app.use(admin);

//import 404 from controller
const get404Cont=require('./Controller/404Controller');
app.use(get404Cont.get404);

app.listen(process.env.PORT || 5000);