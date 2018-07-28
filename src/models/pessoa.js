'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    nome: {
        type: String
    },
    cpf: {
        type: String
    },
    endereco: {
        type: String
    },
    telefone: {
        type: String
    },
});

module.exports = mongoose.model('pessoaSchema', schema);