'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class Product extends mongoose.Schema {
    constructor() {
      const Product = super({
          title: {
              type: String,
              required: true,
              trim: true
          },
          slug: {
              type: String,
              required: [true, 'mensagem de retorno de erro'],
              trim: true,
              index: true,
              unique: true
          },
          description: {
              type: String,
              required: true,
              trim: true
          },
          price: {
              type: Number,
              required: true
          },
          active: {
              type: Boolean,
              required: true,
              default: true
          },
          tags: [{
              type: String,
              required: true
          }]
      })
  
      Product.methods.getTitle = this.getTitle

      return Product
    }
  
    getTitle() {
      return this.title
    }
}

module.exports = mongoose.model('Product', new Product);
