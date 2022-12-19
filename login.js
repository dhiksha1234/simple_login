const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
//const http =require("http");  
let port = 8100;

const app = express();
app.use("/assets",express.static("assets"))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Helloworld@123',
    database: 'nodejs'
});

//connect to the database
connection.connect(function(error){
    if (error) throw err
    else console.log("Running successfully")
})

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})
// dirname is a local variable that returns the directory name of current module
//set app port
//app.listen(4500);

//bodyParser - to get user info 
app.post("/", encoder, function(req, res){
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    console.log(username, password);
    connection.query("select * from loginuser where user_name = ? and user_pass = ?",[username,password], function(error,result,fields){
        console.log(result)
        if(result.length){
            res.redirect("/welcome");
        } else {
            res.redirect("/");
        }
        res.end();
    })
})

//when login successfully
app.get("/welcome",function(req, res){
    res.sendFile(__dirname + "/welcome.html");
})
app.listen(port,() => {
    console.log(`Listening to the port ${port}`)
})
