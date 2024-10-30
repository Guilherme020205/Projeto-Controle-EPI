const setor = [
    { id: 1, nome: "Desenvolvimento" },
    { id: 2, nome: "Teste" }
];

const funcionarios = [
    { id: 1, nome: "Mario Bros", telefone: "9999999999", idSetor: 2 }
];

exports.listarFuncionario = (req, res) => {
    res.status(200).send(funcionarios);
};

exports.cadastrarFuncionario = (req, res) => {
    const nome = req.body.nome;
    const telefone = req.body.telefone;
    const idSetor = req.body.idSetor;
    
    const novoFuncionario = {
        id: funcionarios.length + 1,
        nome,
        telefone,
        idSetor
    };
    
    funcionarios.push(novoFuncionario);
    
    res.status(201).send(novoFuncionario);
};
