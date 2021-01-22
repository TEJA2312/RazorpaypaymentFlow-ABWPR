var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({

fullName:{
	type:String,
},
email:{
	type:String,
},
phoneNumber:{
	type:String,
},
yearofStudy:{
	type:String,
},
rollNumber:{
	type:String,
},
paymentMode:{
	type:String,
	default: "NOT RECORDED"
},
paymentStatus:{
	type:String,
	default: "NOT RECORDED"
},
orderID:{
	type:String,
}

});


module.exports = mongoose.model("Applicant", UserSchema);


