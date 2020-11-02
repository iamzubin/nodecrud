const mongoose = require('mongoose');


const CharSchema = mongoose.Schema({
    id: {type : Number, index : { unique : true, dropDups:true }},
    firstName: String,
    lastName:String,
    organization: String

},{strict : true});

module.exports = mongoose.model('movies', CharSchema);