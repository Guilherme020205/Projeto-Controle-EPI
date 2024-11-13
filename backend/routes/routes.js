const express = require('express')
const router = express.Router()
const epiControler = require('../controllers/epiController')
const funcionarioController = require('../controllers/funcionarioController')
const listaControler = require('../controllers/listaController')
const loginController = require('../controllers/loginController')
const tiposEsetorController = require('../controllers/tiposEsetorController.JS')

router.post('/epiController', epiControler.cadastrarEpi);
router.get('/epiController', epiControler.listarEpi);
router.put('/epiController/:id', epiControler.atualizarEpi);
router.delete('/epiController/:id', epiControler.deletarEpi);

router.get('/funcionarios', funcionarioController.listarFuncionarios);
router.get('/funcionarios/:id', funcionarioController.buscarFuncionarioPorId);
router.post('/funcionarios', funcionarioController.adicionarFuncionario);
router.put('/funcionarios/:id', funcionarioController.editarFuncionario);
router.delete('/funcionarios/:id', funcionarioController.excluirFuncionario);

router.get('/listaController', listaControler.listaPedidos);
router.post('/listaController', listaControler.cadastrarPedidos);
router.put('/listaController/:id', listaControler.devolverPedidos);

router.post('/loginController', loginController.loginUser) 

router.get('/tipos', tiposEsetorController.listarTipos);
router.get('/setores', tiposEsetorController.listarSetor);


module.exports = router