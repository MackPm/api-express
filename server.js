const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./src/app/controller/UserController')
const app = express();
var cors = require('cors');
var port = 3001;
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(port, () => {
    console.log('Esta escuchando en el puerto ' + port);
});

//Api Home / {GET}
app.get('/', (req, res) => {
    res.send('Hello word!');
});

//Crate one User /api/v1/user {POST}
app.post('/api/v1/user', (req, res) => {
    controller.CreateUser(req.body).then((result) => {
        if (result) {
            res.send({ Code: 0, Message: 'Se inserto Correctamente', Result: { Succes: result } });
        } else {
            res.send({ Code: -1, Message: 'Ocurrio un problema al intentar guardar', Result: { Succes: result } });

        }
    }).catch((err) => {
        res.send({ Code: -1, Message: 'Ocurrio un problema al intentar guardar', Result: { Succes: false } });

    });
});

//get All Users /api/v1/users {GET}
app.get('/api/v1/users', (req, res) => {
    controller.getAllUser().then((response) => {
        if (response === null) {
            res.send({ Code: -1, Message: null, Users: null });
        } else {
            res.send({ Code: 0, Message: null, Users: response });

        }
    });
});

//get user by userId /api/v1/user/:userId {GET}
app.get('/api/v1/user/:userId',(req,res)=>{
    const userId = req.params.userId;
    controller.getUser(userId).then((response) => {
        if (response === null) {
            res.send({ Code: -1, Message: "Ocurrio un problema al consultar el usuario", User: null });

        } else {
            res.send({ Code: 0, Message: null, User: response });
        }
    });
});


//Delete user by userId {GET}
app.get('/api/v1/userdel/:userId',(req,res)=>{
    const userId = req.params.userId;
    controller.deleteUser(userId).then((response) => {
        if (response) {
            res.send({ Code: 0, Message: "Se elimino correctamente", Result: { Succes: true }  });
        } else {
            res.send({ Code: -1, Message: "No se puede eliminar",Result: { Succes: false }});
        }
    });
});