const Sequelize = require('sequelize');
const database = require('./db');
const Setor = require('./TabelaSetor'); // Importa o modelo Setor

const Funcionario = database.define('funcionario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING
    },
    idSetor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Setor,
            key: 'id'
        }
    }
});

// Definição das associações
Setor.hasMany(Funcionario, { foreignKey: 'idSetor', as: 'funcionarios' });
Funcionario.belongsTo(Setor, { foreignKey: 'idSetor', as: 'setor' });

module.exports = Funcionario;
