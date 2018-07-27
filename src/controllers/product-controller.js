'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = (req,res,next) => {
    //Product.find({title: 'xpto'})
    Product
     //   .find({})
        .find({ 
            active: true
        },'title price slug')
        .then(data => {
            res.status(200).send(data);             
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.getBySlug = (req,res,next) => {
    //Product.find({title: 'xpto'})
    Product
     //   .find({})
     //   .find({ //find tras array
          .findOne({ //traz um só
            slug: req.params.slug, //chama de slug aqui e nas rotas
            active: true
        },'title price slug tags')
        .then(data => {
            res.status(200).send(data);             
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.getById = (req,res,next) => {
    Product
        .findById(req.params.id)
        .then(data => {
            res.status(200).send(data);             
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.getByTag = (req,res,next) => {
    Product
        .find({
            tags: req.params.tag,
            active: true
        },    'title description price slug tags')
        .then(data => {
            res.status(200).send(data);             
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.post = (req, res, next) => {
    var product = new Product(req.body);
    //product = new Product();
    //product.title = req.body.title;
    product
        .save()
        .then(x => {
            res.status(201).send({
                message: 'Produto cadastrado com sucesso !'});                
        }).catch(e => {
            res.status(400).send({
                messagem:'Falho ao cadastrar o produto',
                data: e
            });
        });
};

exports.put = (req, res, next) => {
    Product
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                slug: req.body.slug,
                price: req.body.price
            }
        })
        .then(x => {
            res.status(200).send({
                message:    'Produto atualizado com sucesso !'
            });             
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao utilizar produto',
                data: e
        });
    });  
};

exports.delete = (req, res, next) => {
    Product
        .findOneAndRemove(req.body.id, { //no corpo da mensagem no post que pega o id e deleta
            $set: {
                title: req.body.title,
                description: req.body.description,
                slug: req.body.slug,
                price: req.body.price
            }
        })
        .then(x => {
            res.status(200).send({
                message:    'Produto removido com sucesso !'
            });             
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao remover produto',
                data: e
        });
    });  
};