const Express = require('express');
var bodyParser= require('body-parser');

var request = require('request');

const Mongoose = require('mongoose');

var app=new Express();
app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(Express.static(__dirname+"/public"));

const StudentModel=Mongoose.model("studentdetails",{name:String,rollno:String,admno:String,college:String});

Mongoose.connect("mongodb://localhost:27017/collegedb");

app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/login',(req,res)=>{
    res.render('login');
});

const getdataApi="http://localhost:3004/getdatas";

app.get('/views',(req,res)=>{
    request(getdataApi,(error,response,body)=>{
        var data=JSON.parse(body);
        console.log(data);
        res.render('views',{'data':data});
    });
});

app.get('/getdatas',(req,res)=>{
    result = StudentModel.find( (error,data)=>{
         if(error){
             throw error;
         }
         else{
             res.send(data);
         }
     });
});

app.post('/read',(req,res)=>{
    console.log(req.body);
    var student= StudentModel(req.body);
    var result = student.save( (error)=>{
        if(error){
            throw error;
            res.send(error);
        }
        else{
            res.send('user created');
        }
    });
});
app.listen(process.env.PORT || 3004,()=>{
    console.log("server running on port http://localhost:3004");
});