// copyrights@2020 
// name: tejas Shirnalkar email:tejas.shirnalkar@gmail.com githubID:TEJA2312

var express = require("express");
var app = express();
var mongoose = require('./database/mongoose');
var Applicant = require('./database/Applicant');
var Razorpay=require("razorpay");
var bodyParser = require('body-parser')

// config
app.use(express.static(__dirname + '/public'));
require('dotenv').config();

let instance = new Razorpay({
  key_id: 'rzp_test_MXTPZRJlQVzpRL', // your `KEY_ID`
  key_secret: 'ZtpMZPBQnSTo6wowB65N95g5' // your `KEY_SECRET`
});

app.use('/web', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");


// routes

app.get('/',(req, res)=>{
      res.redirect("/api/payment/order");
});

app.get("/api/payment/order",(req,res)=>{
       var options = {
              amount: 50000,  // amount in the smallest currency unit
              currency: "INR",
              receipt: "order_rcptid_11"
            };
            instance.orders.create(options, function(err, order) {
              console.log(order);
              res.render('register',{order: order});
            });

});


app.post("/applicant",(req, res)=> {
   
       var fullName = req.body.fullName;
       var email = req.body.email;
       var phoneNumber = req.body.phoneNumber;
       var yearofStudy = req.body.yearofStudy;
       var rollNumber = req.body.rollNumber;
       var paymentMode = req.body.paymentMode;
       var paymentStatus = "successfull";
       var orderID = req.body.orderID 
      var newApplicant = {
             fullName: fullName,
             email: email,
             phoneNumber: phoneNumber,
             yearofStudy: yearofStudy,
             rollNumber: rollNumber,
             paymentMode:paymentMode,
             paymentStatus:paymentStatus,
             orderID: orderID
      }
      
       Applicant.create(newApplicant, function (err, newlyCreated) {
           if (err) {
              res.send("failure");
               console.log(err);
           } else {
              res.send("success");
               console.log("POSTED")
           }
       });
   });

   app.get('/allregistration',(req, res)=>{
         Applicant.find().then((docs)=>{
                res.render('list',{docs:docs});
         });
   });





app.post("/api/payment/verify",(req,res)=>{

body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
var crypto = require("crypto");
var expectedSignature = crypto.createHmac('sha256', 'ZtpMZPBQnSTo6wowB65N95g5').update(body.toString()).digest('hex');

console.log("sig"+req.body.razorpay_signature);
console.log("sig"+expectedSignature);


if(expectedSignature === req.body.razorpay_signature){
    res.send("success");
}else{
       res.send("failure");
}
});


app.get('/payment/success/:orderID',(req, res)=>{
     
       Applicant.findOne({orderID:req.params.orderID}).then((docs)=>{
              res.render('reciept',{docs:docs});
              console.log(docs);
       });
});

app.get('/payment/failure',(req, res)=>{
       res.send('failure in payment');
});


app.listen(process.env.PORT||3000, process.env.IP, function(){
       console.log("server running on 3000");
      });
      