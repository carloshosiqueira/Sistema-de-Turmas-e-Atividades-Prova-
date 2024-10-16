const express = require("express");
const router = express.Router();

const Professor = require('./controllers/professor')
const Atividade = require('./controllers/atividades')
const Turma = require('./controllers/turmas')

router.post('/login', Professor.login)

router.get('/professor', Professor.read);
router.get('/professor/:matricula', Professor.read);
router.post('/professor', Professor.create);
router.put('/professor/:matricula', Professor.update);
router.delete('/professor/:matricula', Professor.del);

router.get('/atividade', Atividade.read);
router.get('/atividade/:idAtividade', Atividade.read);
router.post('/atividade', Atividade.create);
router.put('/atividade/:idAtividade', Atividade.update);
router.delete('/atividade/:idAtividade', Atividade.del);

router.get('/turma', Turma.read);
router.get('/turma/:idTurma', Turma.read);
router.post('/turma', Turma.create);
router.put('/turma/:idTurma', Turma.update);
router.delete('/turma/:idTurma', Turma.del);

router.get('/', (req, res) => { return res.json("API respondendo") });

module.exports = router