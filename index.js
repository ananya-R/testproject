const express= require("express");

const path = require('path');
const app=express();
const bodyParser = require('body-parser')
const http = require('http').Server(app);
const io = require('socket.io')(http);
require("dotenv").config();
const mysql      = require('mysql');
var generatePassword = require("password-generator");
const connection = mysql.createConnection({
  host     : process.env.host,
  user     : process.env.user,
  port     :  3306,
  password : process.env.password,
  database : process.env.db
});

var PORT = process.env.PORT || 3010;
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ 
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
app.use(express.static(path.join(__dirname, './build')));
const csvFilePath='./docs/BeetleNut_Data.csv'
const admin={
    username:'admin',
    password:'admin@123'
}
let user;
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

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});


app.post('/getData',function(req,res){
    let x=[];
    connection.query("SELECT Branch_Name,Address,City,Branch_Incharge,Contact_Number from beetle_copy where Pincode="+req.body.pincode+"",function(err,result,fields){
        if (err) throw err;
        else{
            if(result.length==0){
                connection.query("SELECT Branch_Name,Address,City,Branch_Incharge,Contact_Number,Pincode_Covered from beetle_copy",function(err,result,fields){
                    if (err) console.log(err);
                  if(result.length==0){
                    res.send({"status":"Failed","message":"Bad Bad luck, No Donut for you!!"});
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

app.post('/admin',function(req,res){
  if(req.body.username==admin.username && req.body.password==admin.password){
    connection.query("SELECT Customer_Data,Customer_Pincode,Date from  notifications",function(err,result,fields){
      if (err) throw err;
      else{
        let y=JSON.parse(JSON.stringify(result));
        let c_data=[];
        y.forEach(el => {
          el.Date=el.Date.split('T')[0];
            c_data.push({'contact':el.Customer_Data,'pincode':el.Customer_Pincode,'date':el.Date});
        })
        res.send([{'status':'Success','CData':c_data}]);
      }
    });
  }
  else{
    res.send([{'status':'Failed'}]);
  }
})

app.post('/verify',function(req,res){
    connection.query("SELECT Password,Pincode,Pincode_Covered from beetle_copy where Username='"+req.body.username+"'" ,function(err, result, fields){ 
    if (err) throw err;
        let x=JSON.parse(JSON.stringify(result));
        if(req.body.password==x[0].Password){
            let p=x[0].Pincode_Covered.split(',');
            connection.query("SELECT Customer_Data,Customer_Pincode,Date from  notifications",function(err,result,fields){
              if (err) throw err;
              else{
                let y=JSON.parse(JSON.stringify(result));
                let c_data=[];
                y.forEach(el => {
                  if(el.Customer_Pincode==x[0].Pincode || p.includes(el.Customer_Pincode)){
                    el.Date=el.Date.split('T')[0];
                    c_data.push({'contact':el.Customer_Data,'date':el.Date});
                  }
                })
                res.send([{'Pincode':x[0].Pincode,'status':'Success','message':'Success','Pincode_Covered':p,'CData':c_data}]);
              }
            });
        }
        else{
            res.send([{'status':'Failed','message':'Invalid Credentials'}])
        }
});
})
    
let interval;

io.on("connection", socket => {
  socket.on('notification', data => {
    console.log(data);
    connection.query("INSERT INTO notifications (Customer_Data,Customer_Pincode,Date) VALUES ('"+data.customer.contact+"','"+data.customer.pincode+"', STR_TO_DATE('"+data.date+"','%Y-%m-%d'))", (err,result,fields) => {
      if(err) throw err;
    });
    socket.emit('message',[{
      'contact':data.customer.contact,
      'pincode':data.customer.pincode,
      'date':data.date
    }]);
  });
});

// const getApiAndEmit = socket => {
  
//   // myEmitter.emit('message');
// };

http.listen(PORT);


