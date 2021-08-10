'use strict'

var express = require('express');
var contactController = require('../controllers/contact.controller');

var api = express.Router();
var mdAuth = require('../middlewares/authenticated');

api.put('/:id/setContact', mdAuth.ensureAuth, contactController.setContact); 
api.put('/:idU/updateContact/:idC', mdAuth.ensureAuth, contactController.updateContact); 
api.put('/:idU/removeContact/:idC', mdAuth.ensureAuth, contactController.removeContact); 

module.exports = api;