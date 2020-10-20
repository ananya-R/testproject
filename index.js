const express= require("express");
const app=express();
const bodyParser = require('body-parser')
const http = require('http').Server(app);
const io = require('socket.io')(http);
require("dotenv").config();
const mysql      = require('mysql');
var generatePassword = require("password-generator");
// const EventEmitter = require('events');
// class MyEmitter extends EventEmitter {}
// const myEmitter = new MyEmitter();
// myEmitter.setMaxListeners(15);
const connection = mysql.createConnection({
  host     : process.env.host,
  user     : process.env.user,
  port     :  3306,
  password : process.env.password,
  database : process.env.db
});
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
  });
// io.on('connection', () => { /* … */ });

const csvFilePath='./docs/BeetleNut_Data.csv'
const admin={
    username:'admin',
    password:'admin@123'
}

function renameKey ( obj, oldKey, newKey ) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }

connection.connect( (err) =>
    {
        if (err) throw err;
        console.log("Connected");
    });

    // const csv=require('csvtojson')
    // csv()
    // .fromFile(csvFilePath)
    // .then((jsonObj)=>{
    //     jsonObj.forEach(el=> 
    //         {
    //             renameKey(el,'Branch Name','Branch_Name');
    //             renameKey(el,'Contact Number','Contact_Number');
    //             renameKey(el,'Branch Incharge','Branch_Incharge');
    //             renameKey(el,'Pincode covered','Pincode_Covered');
    //             var Branch_Name=el.Branch_Name,
    //                 Address=el.Address,
    //                 City=el.City,
    //                 Pincode=el.Pincode,
    //                 Contact_Number=el.Contact_Number,
    //                 Branch_Incharge=el.Branch_Incharge,
    //                 Pincode_Covered=el.Pincode_Covered,
    //                 Username=el.Branch_Name,
    //                 Password=generatePassword()
                
    //             var insertStatement =  
    //                 `INSERT INTO beetle values(?, ?, ?, ?, ?, ?, ?, ?, ?)`; 
    //                 var items = [Branch_Name,Address,City,Pincode,Contact_Number,Branch_Incharge,Pincode_Covered,Username,Password]; 
            
    //                 connection.query(insertStatement, items,  
    //                     (err, results, fields) => { 
    //                     if (err) throw err;
    //                     console.log("Success");
    //                 }); 
    //         });
    // })


app.post('/getData',function(req,res){
    let x=[];
    connection.query("SELECT Branch_Name,Address,City,Branch_Incharge,Contact_Number from beetle_copy where Pincode="+req.body.pincode+"",function(err,result,fields){
        if (err) throw err;
        else{
            if(result.length==0){
                connection.query("SELECT Branch_Name,Address,City,Branch_Incharge,Contact_Number,Pincode_Covered from beetle_copy",function(err,result,fields){
                    if (err) console.log(err);
                  if(result.length==0){
                    res.send({"message":"Bad Bad luck, No Donut for you!!"});
                  }
                  else{
                    result.forEach(element => {
                        if(element.Pincode_Covered.includes(req.body.pincode)){
                            x.push({"Branch_Name":element.Branch_Name,"Address":element.Address,"City":element.City,"Branch_Incharge":element.Branch_Incharge,"Contact_Number":element.Contact_Number})
                        }
                      });
                      res.send(x);
                  }
                })
            }
            else{
                result.forEach(element => {
                        x.push({"Branch_Name":element.Branch_Name,"Address":element.Address,"City":element.City,"Branch_Incharge":element.Branch_Incharge,"Contact_Number":element.Contact_Number})
                  });
                  res.send(x);
            }
        }
    })
})

app.post('/verify',function(req,res){
    console.log(req.body);
    connection.query("SELECT Password from beetle_copy where Username='"+req.body.username+"'" ,function(err, result, fields){ 
    if (err) throw err;
        let x=JSON.parse(JSON.stringify(result));
        if(req.body.password==x[0].Password){
            res.send([{'status':'Success','message':'Success'}])
        }
        else{
            res.send([{'status':'Failed','message':'Invalid Credentials'}])
        }
});
})
    
let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on('message', (data)=>{
    console.log(data);
    socket.broadcast.emit('message','message321');
    socket.on('message',(data)=>{io.emit('createmessage','hello')});
  });
  // if (interval) {
  //   clearInterval(interval);
  // }
  // interval = setInterval(() => getApiAndEmit(socket), 500);
  // socket.on("disconnect", () => {
  //   console.log("Client disconnected");
  //   clearInterval(interval);
  // });
});

const getApiAndEmit = socket => {
  
  // myEmitter.emit('message');
};

http.listen(3010);


