(async () => {
    const database = require('./models/db.js')
    const Epis = require('./models/TabelaEpis.js')
    const Funcionario = require('./models/TabelaFuncionario.js')
    const Login = require('./models/TabelaLogin.js')
    const Pedidos = require('./models/TabelaPedidos.js')
    const Setor = require('./models/TabelaSetor.js')
    const tipoEpi = require('./models/TabelaTipoEpi.js')
    
    await database.sync();
    
    const criarEpis = await Epis.create()
    const criarFuncionario = await Funcionario.create()
    const criarLogin = await Login.create()
    const criarPedidos = await Pedidos.create()
    const criarSetor = await Setor.create()
    const criarTipoEpi = await tipoEpi.create()
 
})();