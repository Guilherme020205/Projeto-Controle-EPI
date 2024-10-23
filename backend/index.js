(async () => {
    const database = require('./models/db')
    const Epis = require('./models/epi')
    await database.sync();
    
    const novoEPI = await Epis.create({
        nome: "Luva"
    })
    console.log(novoEPI);


})();