const Sequelize = require('sequelize')
const database = require('./db')
const EPIS = require('./TabelaEpis')
const Funcionario = require('./TabelaFuncionario')

const Pedidos = database.define('pedidos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idFuncionario: {
        type: Sequelize.INTEGER,
        references: {
            model: Funcionario,
            key: 'id'
        }
    },
    idOculos: {
        type: Sequelize.INTEGER,
        references: {
            model: EPIS,
            key: 'id'
        }
    },
    quantidadeOculos: Sequelize.INTEGER,
    idMascara: {
        type: Sequelize.INTEGER,
        references: {
            model: EPIS,
            key: 'id'
        }
    },
    quantidadeMascara: Sequelize.INTEGER,
    idluva: {
        type: Sequelize.INTEGER,
        references: {
            model: EPIS,
            key: 'id'
        }
    },
    quantidadeLuva: Sequelize.INTEGER,
    idBota: {
        type: Sequelize.INTEGER,
        references: {
            model: EPIS,
            key: 'id'
        }
    },
    quantidadeBota: Sequelize.INTEGER,
    idCapacete: {
        type: Sequelize.INTEGER,
        references: {
            model: EPIS,
            key: 'id'
        }
    },
    quantidadeCapacete: Sequelize.INTEGER,
    idFone: {
        type: Sequelize.INTEGER,
        references: {
            model: EPIS,
            key: 'id'
        }
    },
    quantidadeFone: Sequelize.INTEGER,
    idColete: {
        type: Sequelize.INTEGER,
        references: {
            model: EPIS,
            key: 'id'
        }
    },
    quantidadeColete: Sequelize.INTEGER,
})

module.exports = Pedidos