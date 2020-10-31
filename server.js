const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose  = require('mongoose');
const cors = require('cors');
const budgetModel = require('./models/budget_schema');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var url = 'mongodb://localhost:27017/budget';
app.use('',express.static('public'));
app.use(cors());


var url = 'mongodb://localhost:27017/budget';

app.get('/budget',(req,res) => {
    // res.json(budget);
    mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})
            .then(()=>{
                console.log("Connection to the database is established");
                budgetModel.find({})
                           .then((data)=>{
                               console.log(data);
                               res.send(data);
                               mongoose.connection.close();
                           })
                           .catch((err)=>{
                               console.log(err);
                               res.send();
                           })
            })

});


app.post('/budget',(req,res)=>{
    console.log(req.body);
    let data = {id: req.body._id, title: req.body.title, budget: req.body.budget, color: req.body.color}
    mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})
            .then(()=>{
                console.log("Connection to the database is established");
                budgetModel.insertMany(data,(err,data)=>{
                    if(err){
                        console.log(err);      
                        res.send(err);
                        mongoose.connection.close();
                    }else{
                        console.log("insert successful"); 
                        res.send(data);    
                        mongoose.connection.close();
                    }                    
                })                              
})
});

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});
