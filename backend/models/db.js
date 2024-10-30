const Sequelize = require('sequelize')

const sequelize = new Sequelize("postgresql://guilherme:q3ZkVin2AltDRYaTzJ6Rgg@fanged-phoenix-3150.j77.aws-us-east-1.cockroachlabs.cloud:26257/sa?sslmode=verify-full")  

module.exports = sequelize;

/*

Dados conectar pelo DBEAVER

Host: 
fanged-phoenix-3150.j77.aws-us-east-1.cockroachlabs.cloud
Port:
    26257
Banco de dados: 
    defaultdb
Nome de usuario:
    guilherme
senha: 
    q3ZkVin2AltDRYaTzJ6Rgg
Cliente local:
    Postgres16

******************* Abrir aba PostgresSQL *******************
    Selecionar Exibir todos os bancos de dados 

*/