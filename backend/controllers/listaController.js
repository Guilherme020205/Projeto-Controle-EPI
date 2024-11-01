const listaPedidos = require('../models/TabelaPedidos');

exports.listaPedidos = async (req, res) => {
    try {
        const resposta = await listaPedidos.findAll();
        res.status(200).json(resposta);
    } catch (error) {
        res.status(500).send({ mensagem: 'Erro ao listar EPIs.', erro: error.message });
    }
};


exports.cadastrarPedidos = async (req, res) => {
    const { nome, idTipo, quantidade_estoque, quantidade_saida } = req.body;
    try {
        const novoEpi = await cadastrarPedidos.create({
            nome,
            idTipo,
            quantidade_estoque,
            quantidade_saida
        });
        res.status(201).send({ mensagem: 'cadastro adicionado com sucesso!', novoEpi });
    } catch (error) {
        res.status(500).send({ mensagem: 'Erro ao cadastrar EPI.', erro: error.message });
    }
};
