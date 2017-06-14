/**
 * Importa a Biblioteca mongoose, não precisa fazer a conecxão
 * novamento, porque já foi feita no arquivo principal app.js
 * na linha 8
 */
var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var usuario = new Schema({
    nome: String,
    email: String
});

var UsuarioModel = mongoose.model("usuario", usuario);

module.exports = UsuarioModel;