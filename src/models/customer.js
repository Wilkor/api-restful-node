const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    usuario: {
        type: String,
        required: true,
        trim: true
    },
    senha: {

        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true

    },
    email: {

        type: String,
        required: true,
        trim: true

    },
    roles:[{

          type: String,
          required: true,
          enum:['user','admin'],
          default:'user'

    }]

});

module.exports = mongoose.model('Customer', schema);