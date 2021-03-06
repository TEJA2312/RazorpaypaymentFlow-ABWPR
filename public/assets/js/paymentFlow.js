// copyrights@2020 
// name: tejas Shirnalkar email:tejas.shirnalkar@gmail.com githubID:TEJA2312


//- form control for phone number
function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

// RAZORPAY api settings
var rzp1 = new Razorpay(options);

rzp1.on('payment.failed', function (response){

    location.replace( "/payment/failure"); // redirect to failure page
    // console.log(response);
});

document.getElementById('rzp-button1').onclick = function(e){
   if(validateForm()==true){
    rzp1.open();
    e.preventDefault();
   }
}

// signature verification of Razorpay
const check = (orderID,payID,signature)=>{
  var url = '/api/payment/verify';
  var params = {razorpay_order_id: orderID,razorpay_payment_id:payID,razorpay_signature:signature };
  var xmlHttp = new XMLHttpRequest();

      xmlHttp.onreadystatechange = function (res) {
        if (xmlHttp.readyState === 4) {
          if(xmlHttp.responseText== "success"){ 
            SuccessRecord(orderID);
                }else{ 
                  console.log("failed here ##");
              location.replace( "/payment/failure");
                }
              };
            };
xmlHttp.open("POST", url, true); // false for synchronous request
xmlHttp.setRequestHeader("Content-type", "application/json");
xmlHttp.send(JSON.stringify(params));

}; 

// Save the record to the database
const SuccessRecord = (orderID)=>{
  var url = '/applicant';
  var params = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    yearofStudy: document.getElementById("yearofStudy").value,
    rollNumber: document.getElementById("rollNumber").value,
    paymentMode:"Online",
    orderID:orderID,
};

  var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function (res) {
        if (xmlHttp.readyState === 4) {
            if(xmlHttp.responseText== "success"){
                location.replace("/payment/success/"+ orderID);
            }else{
                location.replace( "/payment/failure");
            };
          
        };
    };
            

xmlHttp.open("POST", url, true); // false for synchronous request
xmlHttp.setRequestHeader("Content-type", "application/json");
xmlHttp.send(JSON.stringify(params));

}; 

// form validation before payment
function validateForm() {
    let f = document.forms["myForm"]["fullName"].value;
    let e = document.forms["myForm"]["email"].value;
    let p = document.forms["myForm"]["phoneNumber"].value;
    let c = document.forms["myForm"]["yearofStudy"].value;
    let r = document.forms["myForm"]["rollNumber"].value;

    if (f == "") {
      alert("Name must be filled out");
      return false;
    }else if (e == ""){
      alert("Enter your Email Address");
        return false;
    }else if (p == ""){
      alert("Enter Valid Phone Number");
        return false;
    }else if(c==""){
      alert("Enter your college name");
    } else if(r==""){
      alert("Enter your college rollnumber");
    } else{
        return true;
    }
  }

// ------|||----------------