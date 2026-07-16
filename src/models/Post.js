const mongoose = require('mongoose');

//Garante que todo post feito, tenha essa exata estrutura
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, //Torna obrigatorio
    trim: true //Tira espacos em branco
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: [] //Garante que seja preenchido mesmo que seja enviado em branco
  }
}, { 
  timestamps: true //adiciona a data de criacao e de atualizacao
});

module.exports = mongoose.model('Post', postSchema);