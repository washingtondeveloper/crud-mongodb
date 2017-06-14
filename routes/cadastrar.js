var express = require('express');
var cadastrarRouter = express.Router(); // Retorna a rota do arquivo app.js
var bodyParser = require('body-parser'); // objeto responsavel pelo o post da request
var UsuarioModel = require('../models/usuariomodel'); // Traz o Model para acesso a banco 'MongoDB'
var urlEncoded = bodyParser.urlencoded({extended: false}); // Abilita o body-parser no metodo post

/**
 * Verifica se é o primeiro acesso
 * se for ele salva, se não for
 * ele atualiza.
 */
cadastrarRouter.post('/', urlEncoded, function(req, res){
    if(!req.body._id){
        UsuarioModel.create({
            nome: req.body.nome,
            email: req.body.email
        });
        res.redirect('/');
    }else {
        UsuarioModel.findById({_id: req.body._id}, function(err, usuario){
            if(err) throw err;
            usuario.nome = req.body.nome;
            usuario.email = req.body.email;

            usuario.save(function(err){
                if(err) throw err;
                console.log("Atualizado");
            });
        });
        res.redirect('/');
    }
});

/**
 * Remove e redireciona para a tela principal
 */
cadastrarRouter.get('/:id', function(req, res){
    UsuarioModel.remove({_id: req.params.id}, function(error){
        if(error) throw "Apagar";
        res.redirect('/');
    });
});

/**
 * Retorna objeto via json
 * Recebe o id como parametro
 */
cadastrarRouter.get('/editar/:id', function(req, res){
    UsuarioModel.findById({_id: req.params.id}, function(erro, usuario){
        if(erro) throw "Pesquisar";
        res.json(usuario)
    });
});

module.exports = cadastrarRouter;