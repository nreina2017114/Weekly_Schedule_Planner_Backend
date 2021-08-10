'user strict'

var express = require('express');
var userController = require('../controllers/user.controller');
var mdAuth = require('../middlewares/authenticated');

var connectMultiparty = require('connect-multiparty');
var mdUpload = connectMultiparty({ uploadDir: './uploads/users'});

var api = express.Router();

api.post('/saveUser', userController.saveUser);  
api.post('/saveUserOnlyAdmin/:id', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], userController.saveUserByAdmin); 
api.post('/login', userController.login); 

//Validaciones de logeo
api.put('/updateUser/:id', mdAuth.ensureAuth, userController.updateUser); 
api.put('/removeUser/:id', mdAuth.ensureAuth, userController.removeUser); 

//validación de logeo y administrador
api.get('/getUsers', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], userController.getUsers); 
api.post('/search', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], userController.search); 

api.put('/:id/uploadImage', [mdAuth.ensureAuth, mdUpload], userController.uploadImage);  
api.get('/getImage/:fileName', [ mdUpload], userController.getImage);

module.exports = api;