let Epi = [
    { id: 1, nome: "luva", idTipo: 1, qtdeEstoque: 50, qtdeSaida: 10 }
];

exports.listarEpi = (req, res) => {
    res.status(200).json({ Epi });
};

exports.cadastrarEpi = (req, res) => {
    const novoEpi = req.body;
    novoEpi.id = Epi.length + 1; // Adiciona um ID novo automaticamente
    Epi.push(novoEpi);
    res.status(201).send({ mensagem: 'Epi adicionado com sucesso!' });
};

exports.atualizarEpi = (req, res) => {
    const { id } = req.params;
    const { nome, idTipo, qtdeEstoque, qtdeSaida } = req.body;

    const epiIndex = Epi.findIndex(epi => epi.id === Number(id));
    if (epiIndex === -1) {
        return res.status(404).send({ mensagem: 'Epi não encontrado.' });
    }

    // Atualizando os campos do objeto Epi encontrado
    Epi[epiIndex] = { id: Number(id), nome, idTipo, qtdeEstoque, qtdeSaida };
    res.status(200).send({ mensagem: 'Epi atualizado com sucesso!' });
};

exports.deletarEpi = (req, res) => {
    const idEpi = Number(req.params.id);
    Epi = Epi.filter(epi => epi.id !== idEpi);

    res.status(200).send({ mensagem: 'Epi deletado com sucesso!' });
};
