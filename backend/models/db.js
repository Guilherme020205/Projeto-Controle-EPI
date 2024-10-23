const Sequelize = require('sequelize')

const sequelize = new Sequelize("curso", "postgres", "Qualidade1", {
    dialect: 'postgres',  // Changed 'pg' to 'postgres'
    host: '192.168.1.123',
    port: '5432'
});

module.exports = sequelize;