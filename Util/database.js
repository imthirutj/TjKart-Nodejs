const mysql=require('mysql2');
const pool = mysql.createPool({
   host:'localhost',
   user:'root',
   database:'mydb',
   password:'121212@Tj'
});

module.exports=pool.promise();