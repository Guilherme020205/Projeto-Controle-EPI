import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";


export default function PgFuncionarios() {
    // Estado para armazenar os dados dos funcionários
    const [funcionarios, setFuncionarios] = useState([]); // Inicialize como array vazio

    useEffect(() => {
        listarFuncionarios();
    }, []);

     const navigate = useNavigate();

    // Função para buscar os funcionários do backend
    const listarFuncionarios = async () => {
        try {
            const url = "http://localhost:8080/funcionarios";
            const resposta = await axios.get(url);
            // Atualiza o estado com os dados recebidos
            setFuncionarios(resposta.data);
        } catch (error) {
            console.error("Erro ao listar funcionários:", error);
        }
    };

    return (
        <div className="div-principal">
            <h1>Funcionários</h1>
            <div>
            {funcionarios.length > 0 ? (
                <ul>
                    {funcionarios.map((funcionario) => (
                        <li key={funcionario.id}>
                            <p>Nome: {funcionario.nome}</p>
                            <button><FaWhatsapp /></button>
                            <button><CiSearch /></button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Carregando funcionários ou nenhum funcionário cadastrado.</p>
            )}
            </div>
            <div>
                <button onClick={(() => {navigate('/home/funcionarios/cadastro')})}>Cadastrar Funcionário</button>
            </div>
        </div>

        
    );
}
