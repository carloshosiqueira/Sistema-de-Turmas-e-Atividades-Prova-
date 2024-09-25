const express = require("express");
const router = express.Router();

const Professor = require('./controllers/professor')
const Atividade = require('./controllers/atividades')
const Turma = require('./controllers/turmas')

module.exports = router