const Login = require('../models/TabelaLogin.js'); // ajuste o caminho conforme necessário

exports.loginUser = async (req, res) => {
    const { email, senha } = req.body;

    // Validação de entrada
    if (!email || !senha) {
        return res.status(400).send({ resposta: "Email e senha obrigatórios" });
    }

    try {
        // Procura o usuário pelo email
        const user = await Login.findOne({ where: { email } });

        // Verifica se o usuário foi encontrado e se a senha está correta
        if (user && user.senha === senha) {
            return res.status(200).send({ resposta: "Login concluído" });
        } else {
            return res.status(401).send({ resposta: "Email ou senha incorretos" });
        }
    } catch (error) {
        console.error("Erro ao realizar login:", error);
        return res.status(500).send({ resposta: "Erro no servidor" });
    }
};