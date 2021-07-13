var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');
const { json } = require('express');

router.use(bodyParser.json());

/* GET users listing. */
router.get('/',(req,res,next)=>{
  var sql = 'select * from employee_details where status like "Active"; ';
  db.query(sql,(err,rows,fields)=>{
    if(err){
      res.status(500).send({
        error:"!!!Something Failed!!!"
      })
    }
    res.json(rows);
  })
});

router.get('/:id',(req,res,next)=>{
  var id = req.params.id;
  var sql = 'select * from employee_details where Id = "'+id+'"';
  db.query(sql,(err,row,fields)=>{
    if(err){
      res.status(500).send({
        error:"!!!Something Failed!!!"
      })
    }
    res.json(row[0]);
  })
});

router.post('/create',(req,res,next)=>{
  var name= req.body.Name;
  var hospitalized = req.body.Hospitalized;
  var covid = req.body.Covid;

  var sql = 'INSERT INTO employee_details (Name,Hospitalized,Covid) VALUES (" '+name+' "," '+hospitalized+' "," '+covid+' ");'

  db.query(sql,(err, result)=>{
    if(err){
      res.status(500).send({

        error: "!!!Something Failed!!!"+err,
        Name: name,
        Hospitalized: hospitalized,
        Covid: covid
      })
    }
    else{
      res.json({
        Status: "Success",
        Result: result 
      })
      //console.log("Database:", result);
    }
  })

});

router.put('/update/:id',(req,res,next)=>{
  var id = req.params.id;

 var sql = 'UPDATE employee_details set Name="'+req.body.Name+'", Covid="'+req.body.Covid+'", Hospitalized="'+req.body.Hospitalized+'", status="'+req.body.Status+'" where Id = "'+id+'"; ';

  db.query(sql,(err, result)=>{
    if(err){
      res.status(500).send({
        error: "!!!Something Failed!!! "+err,
      })
    }
    else{
      res.json({
        Status: "Success"
      })
      //console.log("Database:", result);
    }
  })

});

router.delete('/delete/:id',(req,res,next)=>{
var id = req.params.id;

var sql = 'UPDATE employee_details set status="Inactive" where Id = "'+id+'"; ';
 
//var sql = 'DELETE FROM employee_details where Id = " '+id+' " ;'

  db.query(sql,(err, result)=>{
    if(err){
      res.status(500).send({
        error: "!!!Something Failed!!! "+err
      })
    }
    else{
      res.json({
        Status: "Success"
      })
      //console.log("Database:", result);
    }
  })

});


module.exports = router;


//npx kill-port 3000
// npm start