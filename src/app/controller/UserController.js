const { json } = require('body-parser');
const conn = require('../database/connectiondb');
const shemaUser = require('../model/User');

function CreateUser(user) {
    return conn.connectMongoose().then((connect) => {
        if (connect) {

            let newUser = shemaUser();
            newUser.nombre = user.nombre,
                newUser.ApellidoPaterno = user.ApellidoPaterno,
                newUser.ApellidoMaterno = user.ApellidoMaterno,
                newUser.RFC = user.RFC,
                newUser.FechaNacimiento = user.FechaNacimiento

            const saveUser = newUser.save().then((result) => {
                return true
            }).catch((err) => {
                console.log("Ocurrio un error al intentar guardar el usuario " + err);
                return false;
            });
            return saveUser;
        } else {
            return false;
        }
    });
}

function getAllUser() {
    return conn.connectMongoose().then((connect) => {
       
        if (connect) {
            users = shemaUser.find({});
            return users;
        } else {
            return null
        }
        
    });

}

function getUser(userId) {
    return conn.connectMongoose().then((connect) => {
        if (connect) {
            const user = shemaUser.findOne({ '_id': userId }, function (err, user) {
                if (err) {
                    return null
                } else {
                    return user;
                }
            });
            return user;
        } else {
            return null
        }
    });
}

function deleteUser(userId) {
    return conn.connectMongoose().then((connect) => {
        return shemaUser.deleteOne({ '_id': userId }).then((UserRemove) => {
            if (UserRemove.deletedCount === 1) {
                return true;
            } else {
                return false;

            }
        })
    }).catch((err) => {
        return false;
    });
}

module.exports = { CreateUser, getAllUser, getUser, deleteUser }