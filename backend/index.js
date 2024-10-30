(async () => {
    const database = require('./models/db')
    const Epis = require('./models/TabelaEpis')
    const Funcionario = require('./models/TabelaFuncionario')
    const Login = require('./models/TabelaLogin.js')
    const Pedidos = require('./models/TabelaPedidos')
    const Setor = require('./models/TabelaSetor')
    
    await database.sync();
    
    const criarEpis = await Epis.create()
    const criarFuncionario = await Funcionario.create()
    const criarLogin = await Login.create()
    const criarPedidos = await Pedidos.create()
    const criarSetor = await Setor.create()
    console.log(novoEPI);


})();