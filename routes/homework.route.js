'use strict'

// IMPORTACIONES
var express = require('express');
var homeworkController = require('../controllers/homework.controller');
const router = express.Router();

// IMPORTACION MIDDLEWARES PARA RUTAS
var mdAuth = require('../middlewares/authenticated');

router.post('/', ()=>{
    console.log('Creando Tarea..');
})

//RUTAS
var api = express.Router();
api.post('/saveHomework/', homeworkController.saveHomework);
api.get('/getHomeworks', homeworkController.getHomeworks);
api.put('/updateHomework/:id',  homeworkController.updateHomework);
api.delete('/deleteHomework/:id',  homeworkController.deleteHomework);
api.get('/GetHomeworkID/:homeworkid',  homeworkController.GetHomeworkID);

module.exports = api;