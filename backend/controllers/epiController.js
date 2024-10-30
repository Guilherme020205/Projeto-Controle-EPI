let Epi = [
    { id: 1, nome: "luva", idTipo: 1, qtdeEstoque: 50, qtdeSaida: 10 }
]

exports.listarEpi = (req, res) => {
    res.status(200).json({ Epi });
}

exports.cadastrarEpi = (req, res) => {
    const novoEpi = req.body;
    novoEpi.id = Epi.length + 1; // Adiciona um ID novo automaticamente
    Epi.push(novoEpi);
    res.status(201).send({ mensagem: 'Epi adicionado com sucesso!' });
}

exports.atualizarEpi = async (req, res) => {
    const { id } = req.params;
    const { nome, idTipo, qtdeEstoque, qtdeSaida } = req.body;

    try {
        const Epi = await Epi.findByPk(id);
        if (!Epi) {
            return res.status(404).send({ mensagem: 'Epi não encontrado.' });
        }

        await Epi.update({ nome, idTipo, qtdeEstoque, qtdeSaida });
        res.status(200).send({ mensagem: 'Epi atualizada com sucesso!' });
    } catch (error) {
        res.status(500).send({ mensagem: 'Erro ao atualizar a Epi.', erro: error.message });
    }
};

exports.buscarEpiPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const Epi = await Epi.findByPk(id);
        if (!Epi) {
            return res.status(404).send({ mensagem: 'Epi não encontrado.' });
        }
        res.status(200).send({ Epi });
    } catch (error) {
        res.status(500).send({ mensagem: 'Erro ao buscar Epi.', erro: error.message });
    }
};

exports.deletarEpi = (req, res) => {
    const idEpi = Number(req.params.id);
    Epi = Epi.filter(Epi => Epi.id !== idEpi);

    res.status(200).send({ mensagem: 'Epi deletado com sucesso!' });
}

