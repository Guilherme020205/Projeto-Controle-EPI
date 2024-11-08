import "./style.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { CiLogin } from "react-icons/ci";
import Header from "./header/index.jsx";
import axios from 'axios';

export default function PgLogin() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function login_button() {

        if (!email || !senha) {
            toast.error("Email e senha são obrigatórios!");
            return;
        }

        try {
            const url = "http://localhost:8080/loginController";

            const resposta = await axios.post(url, { email, senha });

            // Se o login for bem-sucedido
            if (resposta.status === 200) {
                toast.success("Login realizado com sucesso!");
                // redirecionar o usuario  
            }
        } catch (error) {

            if (error.response && error.response.status === 401) {
                toast.error("Email ou senha incorretos");
            } else {
                toast.error("Erro ao realizar o login. Tente novamente mais tarde.");
            }
        }
    }

    return (
        <>
            <ToastContainer />
            
            <header>
                <Header />
            </header>

            <div className="box-principal">
                <div className="box-form">
                    <h2>Login no sistema</h2>
                    <form>
                        <p>Email</p>
                        <input
                            type="email"
                            placeholder="admin@gmail.com"
                            value={email}
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <p>Senha</p>
                        <input
                            type="password"
                            placeholder="admin1"
                            value={senha}
                            name="password"
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </form>
                </div>
                <div className="box-button">
                    <button onClick={login_button}>Login <CiLogin className="icon-CiLogin" /></button>
                </div>
            </div>
        </>
    );
}
