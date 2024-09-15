const userService = require('../services/user-service')
const authService = require('../services/auth-service');
const User = require("../models/User");

/**
 * endpoint, which handles login
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.login = function (req, res){
    const db = req.app.get('db');//get database from express

    userService.verify(db, req.body).then(user=> { //verify credentials via user-service
        authService.authenticate(req.session, user); //mark session as authenticated
        res.send('login successful');
    }).catch(_=>{
        res.status(401).send('login failed');
    })
}

/**
 * endpoint, which handles logout
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.logout = function (req, res){
    authService.deAuthenticate(req.session); //destroy session
    res.send('logout successful');
}

/**
 * endpoint, which returns whether a user is authenticated
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.isLoggedIn = function (req, res){
    if(authService.isAuthenticated(req.session)){ //check via auth-service
        res.send({loggedIn: true});
    }else {
        res.send({loggedIn: false});
    }
}

/**
 * endpoint, which handles user registration (Fake)
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.register = async function (req, res) {
    const db = req.app.get('db');
    const { username, password, firstname, lastname, email, jobTitle } = req.body;

    // Check if the user already exists
    const existingUser = await userService.get(db, username);
    if (existingUser) {
        res.status(400).send('User already exists! Please login');
    }

    const user = new User(username, firstname, lastname, email, jobTitle, password, false);

    // authService.authenticate(req.session, user) brauchen wir nicht, da es in login gemacht wird.
    await userService.add(db, user).then(res.send('register successful')).catch((err)=>{res.status(401).send('register failed');});
};