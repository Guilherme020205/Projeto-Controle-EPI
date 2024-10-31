const Epi = require("../models/TabelaEpis.js");

exports.listarEpi = async (req, res) => {
    try {
        const resposta = await Epi.findAll();
        res.status(200).json(resposta);
    } catch (error) {
        res.status(500).send({ mensagem: 'Erro ao listar EPIs.', erro: error.message });
    }
};

exports.cadastrarEpi = async (req, res) => {
    const { nome, idTipo, quantidade_estoque, quantidade_saida } = req.body;
    try {
        const novoEpi = await Epi.create({
            nome,
            idTipo,
            quantidade_estoque,
            quantidade_saida
        });
        res.status(201).send({ mensagem: 'Epi adicionado com sucesso!', novoEpi });
    } catch (error) {
        res.status(500).send({ mensagem: 'Erro ao cadastrar EPI.', erro: error.message });
    }
};

exports.atualizarEpi = async (req, res) => {
    const { id } = req.params;
    const { nome, idTipo, quantidade_estoque, quantidade_saida } = req.body;

    try {
        const epi = await Epi.findByPk(id);
        if (!epi) {
            return res.status(404).send({ mensagem: 'Epi não encontrado.' });
        }

        await epi.update({
            nome,
            idTipo,
            quantidade_estoque,
            quantidade_saida
        });
        res.status(200).send({ mensagem: 'Epi atualizado com sucesso!', epi });
    } catch (error) {
        res.status(500).send({ mensagem: 'Erro ao atualizar EPI.', erro: error.message });
    }
};

exports.deletarEpi = async (req, res) => {
    const { id } = req.params;

    try {
        const rowsDeleted = await Epi.destroy({
            where: { id }
        });

        if (rowsDeleted === 0) {
            return res.status(404).send({ mensagem: 'Epi não encontrado.' });
        }

        res.status(200).send({ mensagem: 'Epi deletado com sucesso!' });
    } catch (error) {
        res.status(500).send({ mensagem: 'Erro ao deletar EPI.', erro: error.message });
    }
};
