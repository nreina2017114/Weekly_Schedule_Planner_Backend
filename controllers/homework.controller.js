'use strict'

var Homework = require('../models/homework.controller');




// ----------------------------------------------------------------------------------------------------------------

function saveHomework(req,res) {
    var tareaModel = new Homework();
    var params = req.body; 
 
    if(params.nameHomework && params.description){
        Homework.findOne({nameHomework: params.nameHomework}, (err, tareaGuardado) =>{
            if(err){
                return res.status(500).send({mensaje: "Error del servidor"});
            }else if(tareaGuardado){
                return res.status(500).send({mensaje: "Nombre de la tarea Ya Utilizado!"});
            }else{
        tareaModel.nameHomework = params.nameHomework;
        tareaModel.description = params.description;
        tareaModel.urgencyLevel = params.urgencyLevel;
        tareaModel.importanceLevel = params.importanceLevel;
    
    
        tareaModel.save((err, tareaGuardado)=>{
            if(err) return res.status(500).send({ mensaje: 'Error en la peticion de la tarea' });
            if(!tareaGuardado) return res.status(500).send({ mensaje: 'Error al agregar la tarea' });
 
            return res.status(200).send({ mensaje: "Tarea Creado Correctamente",tareaGuardado })
        })
        }
       
        })
    }else{
        return res.status(500).send({mensaje: "Rellene todos los datos necesarios"})
    }
    
 }




// ----------------------------------------------------------------------------------------------------------------

 function getHomeworks(req, res){
    Homework.find().exec((err, homeworks) => {
        if(err){
            return res.status(500).send({mensaje: "Error al buscar las tareas"})
        }else if(homeworks){
            console.log(homeworks)
            return res.send({mensaje: "Tareas encontrados", homeworks})
        }else{
            return res.status(204).send({mensaje: "No se encontraron las Tareas"})
        }
    })
}




// ----------------------------------------------------------------------------------------------------------------

function GetHomeworkID(req, res) {
    var HomeworkId = req.params.homeworkid;

    Homework.findById(HomeworkId, (err, TareaEncontrado) => {
        if(err){
            return res.status(500).send({ mensaje: 'Error en la peticion de Tarea' });
        }else if(TareaEncontrado){
            return res.status(200).send({mensaje:"La tarea ha sido encontrado exitosamente" ,TareaEncontrado });
        }else{
            return res.status(500).send({ mensaje: 'Error al obtener la tarea.' });
        }
        
    })
}




// ----------------------------------------------------------------------------------------------------------------

function updateHomework(req,res){
    var HomeworkId = req.params.id;
    var update = req.body
    
        Homework.findByIdAndUpdate(HomeworkId, update, {new: true}, (err, updateHomework) =>{
            if(err){
                res.status(500).send({message:"Error general"});
            }else if(updateHomework){
                res.send({Homework: updateHomework});
            }else{
                res.status(404).send({err: "No se ha encontrado la tarea para actualizar"});
            }
        });
    
}




// ----------------------------------------------------------------------------------------------------------------

function deleteHomework(req, res){
    var idHomework = req.params.id;

   
         Homework.findByIdAndRemove(idHomework,(err,deleted)=>{
            if(err){
                res.status(500).send({message:"Error en el servidor ", err});
            }else if(deleted){
                res.send({message:"Tarea eliminado exitosamente", deleted});
            }else{
                res.status(404).send({message:"La tarea que quiere eliminar no existe"});
            }
        });
    }


    

module.exports = {
    saveHomework,
    getHomeworks,
    updateHomework,
    deleteHomework,
    GetHomeworkID
}