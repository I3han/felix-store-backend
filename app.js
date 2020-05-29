const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Item = require('./models/item')

const app = express();

mongoose.connect("mongodb+srv://I3han:ishanahahah@cluster0-uimdj.mongodb.net/felix-store-db-1?retryWrites=true&w=majority")
	.then(() => {	 //promise
		console.log('mongodb connected');
	})
	 .catch(() => {	 //handle errors if it have any(connection falire)
		console.log('connection failer');
	});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false})); //extra line

app.use((req,res,next)=> { 		//use metod needed,bcz need set headers to every request send by client
  res.setHeader("Access-Control-Allow-Origin","*");  //understood by browser,* give access to any req
  res.setHeader("Access-Control-Allow-Headers",
    "Origin,x-Requested-With,Content-Type,Accept"); //these headers may not needed
  res.setHeader("Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS" );
  next();
});

app.post("/api/items" ,(req,res,next) =>{
 const item = new Item(req.body);
  console.log(item);
  item.save(); res.status(201).json({
    message: 'item added successfully'
  });
});

app.get("/api/items", (req,res,next)=>{

  Item.find().then(documents => {
    // console.log(documents);
    res.status(200).json({
      message:'server working!',
      items: documents
    });
  });

})

module.exports = app;
