/**
 * Esse sistema simplesmente cadastra nome e email
 * no banco de dados, e logo após o cadastro
 * o sistema lista todos os contatos registrado no banco
 * 
 */
var express = require('express');
var cadastrar = require('./routes/cadastrar'); // adiciona a rota de cadastro
var mongoose = require('mongoose'); // Importa a biblioteca mongoose
var UsuarioModel = require('./models/usuariomodel'); // Traz o obejto Model para ser Utilizado

var app = express(); // ativa o funcao express

mongoose.connect('mongodb://localhost/meu_banco'); // Conecta com o Banco

app.set('view engine', 'ejs'); // adiciona com metodo 'set' o ejs para gerenciar as views
app.use(express.static('public')); // padroniza  a pasta 'public' para os arquivos estaticos: css, js...

app.use('/cadastrar', cadastrar); // utiliza a rota de cadastro, apartir de /cadastrar
app.get('/', function(req, res){
    UsuarioModel.find(function(error, usuarios){
        if(error) throw "Error";
        res.render('index', {usuarios: usuarios});
    });
});

app.listen(3000, function(){
    console.log('NodeJS with MongoDB');
});