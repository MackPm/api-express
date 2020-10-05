const mongoose = require('mongoose');
const patch = 'mongodb://mongo:27017/Pyment';
//const patch = 'mongodb://localhost:27017/Pyment';

async function connectMongoose() {
 const baseConnect = await mongoose.connect(patch, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        return true;
    }).catch((err) => {
        console.log("Ocurrio un error al conectar la BD " + err);
        return false;
    });
    return baseConnect;
}

module.exports= {connectMongoose}