/*
    This file acts as the entrypoint for node.js
 */

const express = require('express');
const cookieSession = require('cookie-session');

const multer = require('multer');
const upload = multer();
const app = express();
const crypto = require('crypto');
const cors = require('cors');

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const swaggerJSDoc = require('swagger-jsdoc');
const optionsSwagger = require('./utils/swagger');
const swaggerUI = require('swagger-ui-express');


let environment;
if(process.env.NODE_ENV === 'development'){
    environment = require('../environments/environment.js').default;
}else{
    environment = require('../environments/environment.prod.js').default;
}

app.set('environment', environment);

app.use(express.json()); //adds support for json encoded bodies
app.use(express.urlencoded({extended: true})); //adds support url encoded bodies
app.use(upload.array()); //adds support multipart/form-data bodies

app.use(cookieSession({
    secret: crypto.randomBytes(32).toString('hex'),
    sameSite: false,
    secure: false,
    httpOnly: false
}));

app.use(cors({
    origin: environment.corsOrigins,
    credentials: true
}));

const apiRouter = require('./routes/api-routes');
app.use('/api', apiRouter); //mount api-router at path "/api"
// !!!! attention all middlewares, mounted after the router wont be called for any requests

//preparing database credentials for establishing the connection:
let db_credentials = '';
if(environment.db.username){
    db_credentials = environment.db.username+':'+environment.db.password+'@';
}

// MongoClient.connect('mongodb://' + db_credentials + environment.db.host + ':' + environment.db.port + '/?authSource='+environment.db.authSource).then(async dbo =>{ //connect to MongoDb
MongoClient.connect('mongodb+srv://oemersuezen:NDomyAOEOujuh2Cd@cluster0.in2cw.mongodb.net/').then(async dbo =>{ //connect to MongoDb


    const db = dbo.db('performanceDB');
    await initDb(db); //run initialization function
    app.set('db',db); //register database in the express app

    console.log(optionsSwagger)
    const specs = swaggerJSDoc(optionsSwagger);
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

    app.listen(environment.port, () => { //start webserver, after database-connection was established
        console.log('Documentation can be found under http://localhost:8080/api-docs');
        console.log('Webserver started.');
    });
});

async function initDb(db){
    if(await db.collection('users').count() < 1){ //if no user exists create admin user
        const userService = require('./services/user-service');
        const User = require("./models/User");

        const adminPassword = environment.defaultAdminPassword;
        await userService.add(db, new User('admin', '', 'admin', '','', adminPassword, true));

        console.log('created admin user with password: '+adminPassword);
    }
}
