const Tipos = require('../models/TabelaTipoEpi');  
const Setor = require('../models/TabelaSetor');


exports.listarTipos = async (req, res) => {
    try {
        const resposta = await Tipos.findAll();
        res.status(200).json(resposta);
    } catch (error) {
        res.status(500).send({ mensagem: 'Erro ao listar Tipos.', erro: error.message });
    }
}

exports.listarSetor = async (req, res) => {
    try {
        const resposta = await Setor.findAll();
        res.status(200).json(resposta);
    } catch (error) {
        res.status(500).send({ mensagem: 'Erro ao listar Setor.', erro: error.message });
    }
}