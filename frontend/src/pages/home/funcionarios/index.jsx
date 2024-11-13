import './style.css'

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
            <div className='box-geral-funcinarios'>
                <div className='box-lista-funcionarios'>
                    {funcionarios.length > 0 ? (
                        <ul>
                            {funcionarios.map((funcionario) => (
                                <li key={funcionario.id}>
                                    <p>{funcionario.nome}</p>
                                    <div className='box-botao-opcoes-funcionario'>
                                        <button>
                                            <a href={`https://web.whatsapp.com/send?phone=+${funcionario.telefone}&text=Ola%20mundo`}><FaWhatsapp className='icon-opcoes-funcionario'/></a>
                                        </button>
                                        <button><CiSearch className='icon-opcoes-funcionario'/></button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Carregando funcionários ou nenhum funcionário cadastrado.</p>
                    )}
                </div>
                <div className='box-botao-funcionarios'>
                    <button onClick={(() => { navigate('/home/funcionarios/cadastro') })}>Cadastrar Funcionário</button>
                </div>
            </div>
        </div>
    );
}
