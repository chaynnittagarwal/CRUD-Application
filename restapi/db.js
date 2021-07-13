var mysql = require('mysql');

var connection= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'chanit@1998',
    database: 'employee'
})

connection.connect((err)=>{
    if(err){
        throw err;
    }
  //  console.log('Conneted to Database');
})

module.exports = connection;