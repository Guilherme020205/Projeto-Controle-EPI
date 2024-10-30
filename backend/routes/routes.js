const express = require('express')
const router = express.Router()
const epiControler = require('../controllers/epiController')
const funcionarioControler = require('../controllers/funcionarioController')
const listaControler = require('../controllers/listaController')
const loginController = require('../controllers/loginController')

router.post('/epiController', epiControler.cadastrarEpi);
router.get('/epiController', epiControler.listarEpi);
router.put('/epiController/:id', epiControler.atualizarEpi);
router.delete('/epiController/:id', epiControler.deletarEpi);


router.get('/listarFuncionario', funcionarioControler.listarFuncionario) 
router.post('/cadastrarFuncionario', funcionarioControler.cadastrarFuncionario)

router.get('/loginController', loginController.loginUser) 

module.exports = router 