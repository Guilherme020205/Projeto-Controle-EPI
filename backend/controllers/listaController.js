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
    const { devolvido, idpedido, idOculos, quantidadeOculos, idMascara, quantidadeMascara, idLuva, quantidadeLuva, idBota, quantidadeBota, idCapacete, quantidadeCapacete, idFone, quantidadeFone, idColete, quantidadeColete } = req.body;
    try {
        const novoEpi = await listaPedidos.create({
            devolvido,
            idpedido,
            idOculos,
            quantidadeOculos,
            idMascara,
            quantidadeMascara,
            idLuva,
            quantidadeLuva,
            idBota,
            quantidadeBota,
            idCapacete,
            quantidadeCapacete,
            idFone,
            quantidadeFone,
            idColete,
            quantidadeColete,
        });
        res.status(201).send({ mensagem: 'cadastro adicionado com sucesso!', novoEpi });
    } catch (error) {
        res.status(500).send({ mensagem: 'Erro ao cadastrar EPI.', erro: error.message });
    }
};


exports.devolverPedidos = async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await listaPedidos.findByPk(id);
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido não encontrado.' });
        }
        await pedido.update({ devolvido : true });
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao editar Pedido.' });
    }
};