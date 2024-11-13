import "./style.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { CiLogin } from "react-icons/ci";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function PgLogin() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [botaoLogn, setBotaoLogn] = useState(
        <>Login <CiLogin className="icon-CiLogin" /></>
    );
    
    const navigate = useNavigate();

    async function login_button() {

        const mudarTitulo = () => {
            setBotaoLogn('Entrando ... ');
          };

        if (!email || !senha) {
            toast.error("Email e senha são obrigatórios!");
            return;
        }

        
        try {

            await mudarTitulo()

            const url = "http://localhost:8080/loginController";

            const resposta = await axios.post(url, { email, senha });

            // Se o login for bem-sucedido
            if (resposta.status === 200) {
                navigate('/home');
                // await toast.success("Login realizado com sucesso!");
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
        <div className="div-principal">
            <ToastContainer />

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

                <div className="box-button-login">
                    <button onClick={login_button}>{botaoLogn}</button>
                </div>
            </div>
        </div>
    );
}
