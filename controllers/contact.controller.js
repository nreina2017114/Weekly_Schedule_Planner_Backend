'use strict'

var User = require('../models/user.model');
var Contact = require('../models/contact.model');

function setContact(req, res){
    var userId = req.params.id;
    var params = req.body;
    var contact = new Contact();

    if(userId != req.user.sub){
        return res.status(500).send({message: 'No tienes permiso para realizar esta acción'});
    }else{
        User.findById(userId, (err, userFind)=>{
            if(err){
                return res.status(500).send({message: 'Error general en la busqueda'});
            }else if(userFind){
                contact.name = params.name;
                contact.lastname = params.lastname;
                contact.phone = params.phone;

                contact.save((err, contactSaved)=>{
                    if(err){
                        return res.status(500).send({message: 'Error general al guardar'});
                    }else if(contactSaved){
                        User.findByIdAndUpdate(userId, {$push:{contacts: contactSaved._id}}, {new: true}, (err, pushContact)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general al setear contacto'});
                            }else if(pushContact){
                                return res.send({message: 'Contacto creado y agregado', pushContact});
                            }else{
                                return res.status(404).send({message: 'No se seteo el contacto, pero sí se creó en la BD'});
                            }
                        }).populate('contacts')
                    }else{
                        return res.status(404).send({message: 'No se pudo guardar el contacto'});
                    }
                })

            }else{
                return res.status(404).send({message: 'Usuario no existente para crear contactos'});
            }
        })
    }
}

function updateContact(req, res){
    let userId = req.params.idU;
    let contactId = req.params.idC;
    let update = req.body;

    if(userId != req.user.sub){
        return res.status(404).send({message: 'No tienes permiso para realizar esta acción'});
    }else{
        if(update.name && update.phone){
            User.findOne({_id: userId, contacts: contactId}, (err, userContact)=>{
                if(err){
                    return res.status(500).send({message: 'Error general'});
                }else if(userContact){
                    Contact.findByIdAndUpdate(contactId, update, {new: true}, (err, updateContact)=>{
                        if(err){
                            return res.status(500).send({message: 'Error general al actualizar'});
                        }else if(updateContact){
                            return res.send({message: 'Contacto actualizado', updateContact});
                        }else{
                            return res.status(401).send({message: 'No se pudo actualizar el contacto'});
                        }
                    })
                }else{
                    return res.status(404).send({message: 'Usuario o contacto inexistente'});
                }
            }) 
        }else{
            return res.status(404).send({message: 'Por favor ingresa los datos mínimos'});
        }       
    }
}

function removeContact(req, res){
    let userId = req.params.idU;
    let contactId = req.params.idC;
    
    if(userId != req.user.sub){
        return res.status(500).send({message: 'No tienes permiso para realizar esta acción'})
    }else{
        User.findOneAndUpdate({_id: userId, contacts: contactId},
            {$pull: {contacts: contactId}}, {new:true}, (err, contactPull)=>{
                if(err){
                    return res.status(500).send({message: 'Error general'})
                }else if(contactPull){
                    Contact.findByIdAndRemove(contactId, (err, contactRemoved)=>{
                        if(err){
                            return res.status(500).send({message: 'Error general al eliminar el contacto, pero sí eliminado del registro de usuario', err})
                        }else if(contactRemoved){
                            return res.send({message: 'Contacto eliminado permanentemente', contactPull});
                        }else{
                            return res.status(404).send({message: 'Registro no encontrado o contacto ya eliminado'})
                        }
                    })
                }else{
                    return res.status(404).send({message: 'No existe el usuario que contiene el contacto a eliminar'})
                }
            }).populate('contacts')
    }
}


/*function exampleDelete(req, res){
    let params = req.body;
                        DELETE PARA CUALQUIERA QUE HAGA MATCH
                        REMOVE PARA EL PRIMERO QUE HAGA MATCH
    User.findOneAndRemove({name: params.name}, (err, deleteD)=>{
        if(err){
            return res.status(500).send({message: 'Err g'})
        }else if(deleteD){
            return res.send({message: 'Eliminado'})
        }else{
            return res.status(404).send({message: 'sin registros'})
        }
    })
}*/

module.exports = {
    setContact,
    updateContact,
    removeContact
    //exampleDelete
}