var mongoose = require('mongoose'); 
mongoose.Promise = global.Promise

mongoose.connect('mongodb+srv://robocon:wirelesscharging@cluster0.smlgb.mongodb.net/workshoptest1?retryWrites=true&w=majority',
{ useNewUrlParser: true ,useFindAndModify: false, useUnifiedTopology: true });

module.exports ={mongoose};