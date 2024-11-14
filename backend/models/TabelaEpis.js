const Sequelize = require('sequelize');
const database = require('./db');
const TipoEPI = require('./TabelaTipoEpi'); 

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
        allowNull: false,
        references: {
            model: TipoEPI,  
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
});

TipoEPI.hasMany(EPIS, { foreignKey: 'idTipo', as: 'epis' });
EPIS.belongsTo(TipoEPI, { foreignKey: 'idTipo', as: 'tipoEpi' });

module.exports = EPIS;
