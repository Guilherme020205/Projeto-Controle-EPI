const Login = require('../models/TabelaLogin.js');  

exports.loginUser = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send({ resposta: "Email e senha obrigatórios" });
    }

    try {
         const user = await Login.findOne({ where: { email } });

        if (user && user.senha === senha) {
            return res.status(200).send({ resposta: "Login realizado com sucesso" });
        } else {
            return res.status(401).send({ resposta: "Email ou senha incorretos" });
        }
    } catch (error) {
        console.error("Erro ao realizar login:", error);
        return res.status(500).send({ resposta: "Erro no servidor" });
    }
};
