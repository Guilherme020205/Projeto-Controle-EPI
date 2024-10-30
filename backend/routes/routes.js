const express = require('express')
const router = express.Router()
const epiControler = require('../controllers/epiController')

router.post('/epiController', epiControler.cadastrarEpi);
router.get('/epiController', epiControler.listarEpi);
router.get('/epiController/:id', epiControler.buscarEpiPorId);
router.put('/epiController/:id', epiControler.atualizarEpi);
router.delete('/epiController/:id', epiControler.deletarEpi);

const funcionarioControler = require('../controllers/funcionarioController')
const listaControler = require('../controllers/listaController')

// router.get('/', ***Controler.***) 

module.exports = router