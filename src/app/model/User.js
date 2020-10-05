const mongoose = require('mongoose');
const nuewShema=mongoose.Schema;

const UserShema =new nuewShema({
    //_id: mongoose.ObjectId,
    nombre:String,
    ApellidoPaterno:String,
    ApellidoMaterno:String,
    RFC:String,
    FechaNacimiento:Date
})

const shemaUser= mongoose.model('Users',UserShema);
module.exports =shemaUser ;
