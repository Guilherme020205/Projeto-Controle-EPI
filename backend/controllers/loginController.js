const users = [
    { id: 1, email: "admin@gmail.com", senha: "admin1" }
];

exports.loginUser = (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send({ resposta: "Email e senha obrigatórios" });
    }

    const user = users.find(u => u.email === email && u.senha === senha);

    if (user) {
        res.status(200).send({ resposta: "Login concluido" });
    } else {
        res.status(401).send({ resposta: "Email ou senha incorretos" });
    }
};
