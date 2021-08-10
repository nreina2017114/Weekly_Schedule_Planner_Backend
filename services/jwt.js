'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secretKey = 'Clave_super_secreta_Grupo#5';

exports.createToken = (user)=>{
    var payload = {
        sub: user._id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(15, 'days').unix()
    }
    return jwt.encode(payload, secretKey);
}