const Express = require('express');
var app=new Express();
app.set('view engine','ejs');

app.use(Express.static(__dirname+"/public"));

app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/login',(req,res)=>{
    res.render('login');
});
app.listen(process.env.PORT || 3004,()=>{
    console.log("server running on port 3004");
});