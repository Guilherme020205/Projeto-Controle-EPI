const Sequelize = require('sequelize');
const database = require('./db');
const Funcionario = require('./TabelaFuncionario'); // Importa o modelo Funcionario
const EPIS = require('./TabelaEpis'); // Importa o modelo EPI

const Pedido = database.define('pedidos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idFuncionario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Funcionario,
            key: 'id'
        }
    },
    idOculos: {
        type: Sequelize.INTEGER,
        allowNull: true, // Permite que seja nulo se não houver oculos no pedido
        references: {
            model: EPIS,
            key: 'id'
        }
    },
    quantidadeOculos: {
        type: Sequelize.INTEGER,
        allowNull: true // Permite que seja nulo se não houver oculos no pedido
    },
    idMascara: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: EPIS,
            key: 'id'
        }
    },
    quantidadeMascara: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    idLuva: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: EPIS,
            key: 'id'
        }
    },
    quantidadeLuva: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    idBota: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: EPIS,
            key: 'id'
        }
    },
    quantidadeBota: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    idCapacete: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: EPIS,
            key: 'id'
        }
    },
    quantidadeCapacete: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    idFone: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: EPIS,
            key: 'id'
        }
    },
    quantidadeFone: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    idColete: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: EPIS,
            key: 'id'
        }
    },
    quantidadeColete: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

// Definições de associações
Funcionario.hasMany(Pedido, { foreignKey: 'idFuncionario', as: 'pedidos' });
Pedido.belongsTo(Funcionario, { foreignKey: 'idFuncionario', as: 'funcionario' });

module.exports = Pedido;
