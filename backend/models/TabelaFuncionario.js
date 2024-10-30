const Sequelize = require('sequelize')
const database = require('./db')
const Setor = require('./TabelaSetor')

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
        type: Sequelize.STRING,
    },
    idSetor: {
        type: Sequelize.INTEGER,
        references: {
            model: Setor,
            key: 'id'
        }
    }
})

module.exports = Funcionario