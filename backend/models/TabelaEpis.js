const Sequelize = require('sequelize')
const database = require('./db')
const epi = require('./epi')

const EPIS = database.define('epis', {
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
    idTipo: {
        type: Sequelize.INTEGER,
        references: {
            model: epi,
            key: 'id'
        }
    },
    quantidade_estoque: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantidade_saida: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = EPIS