const Funcionario = require('../models/TabelaFuncionario');
const Setor = require('../models/TabelaSetor');

// Listar todos os funcionários
exports.listarFuncionarios = async (req, res) => {
    try {
        const funcionarios = await Funcionario.findAll({
            include: [{ model: Setor, as: 'setor' }]
        });
        res.json(funcionarios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar funcionários.' });
    }
};

exports.buscarFuncionarioPorId = async (req, res) => {
    try {
        // Obter o ID do parâmetro da URL
        const { id } = req.params;
        
        // Buscar o funcionário pelo ID
        const funcionario = await Funcionario.findOne({
            where: { id },  // Filtra pelo ID fornecido
            include: [{ model: Setor, as: 'setor' }]  // Inclui o setor relacionado
        });
        
        // Verificar se o funcionário foi encontrado
        if (!funcionario) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }
        
        res.json(funcionario);  // Retorna o funcionário encontrado
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar funcionário.' });
    }
};


// Adicionar um novo funcionário
exports.adicionarFuncionario = async (req, res) => {
    const { nome, telefone, idSetor } = req.body;
    try {
        const novoFuncionario = await Funcionario.create({ nome, telefone, idSetor });
        res.status(201).json(novoFuncionario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar funcionário.' });
    }
};

// Editar um funcionário
exports.editarFuncionario = async (req, res) => {
    const { id } = req.params;
    const { nome, telefone, idSetor } = req.body;
    try {
        const funcionario = await Funcionario.findByPk(id);
        if (!funcionario) {
            return res.status(404).json({ error: 'Funcionário não encontrado.' });
        }
        await funcionario.update({ nome, telefone, idSetor });
        res.json(funcionario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao editar funcionário.' });
    }
};

// Excluir um funcionário
exports.excluirFuncionario = async (req, res) => {
    const { id } = req.params;
    try {
        const funcionario = await Funcionario.findByPk(id);
        if (!funcionario) {
            return res.status(404).json({ error: 'Funcionário não encontrado.' });
        }
        await funcionario.destroy();
        res.json({ message: 'Funcionário excluído com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir funcionário.' });
    }
};
