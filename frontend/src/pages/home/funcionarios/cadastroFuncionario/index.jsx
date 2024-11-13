import './style.css'
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


export default function PgCadastroFuncionario() {
    // Estados para armazenar os dados do formulário
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [idSetor, setIdSetor] = useState('');
    const [setores, setSetores] = useState([]);

    useEffect(() => {
        listarSetores();
    }, []);

    const navigate = useNavigate();

    const [botaoCadastro, setBotaoCadastro] = useState("Cadastrar funcionário");

    const mudarTitulo = (titulo) => {
        setBotaoCadastro(titulo);
    };



    const listarSetores = async () => {
        try {
            const url = "http://localhost:8080/setores";
            const resposta = await axios.get(url);
            // Atualiza o estado com os dados recebidos
            setSetores(resposta.data);
        } catch (error) {
            console.error("Erro ao listar setores:", error);
        }
    }

    // Função para lidar com o envio do formulário
    const cadastroFuncionario = async () => {

        await mudarTitulo("Cadastrando...")

        try {
            const url = "http://localhost:8080/funcionarios";
            const novoFuncionario = { nome, telefone, idSetor }; // Inclui os campos necessários

            console.log("Enviando dados:", novoFuncionario); // Debug
            const resposta = await axios.post(url, novoFuncionario);

            if (resposta.status === 201) {
                setNome(''); // Limpa o campo nome
                setTelefone(''); // Limpa o campo telefone
                setIdSetor(''); // Limpa o campo idSetor
                navigate('/home/funcionarios')
            }
        } catch (error) {
            await mudarTitulo("Cadastrar funcionário")
            console.error("Erro ao cadastrar funcionário:", error);
            toast.error('Erro ao cadastrar funcionário. Tente novamente.');
        }
    };

    return (
        <div className="div-principal">
            <ToastContainer />
            <div>
                <form className='box-form'>
                    <div className='box-info'>
                        <label>Nome </label>
                        <input
                            className='input-nome'
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="ex: Mario Bros"
                            required
                        />
                    </div>

                    <div className='box-info'>
                        <label>Setor </label>
                        <select
                            className='select-setores'
                            value={idSetor}
                            onChange={(e) => setIdSetor(e.target.value)}
                            required
                        >
                            <option value={null}>-- Selecionar</option>
                            {setores.map((setores) => (
                                <option key={setores.id} value={setores.id}>{setores.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className='box-info'>
                        <label>Telefone </label>
                        <input
                            className='input-telefone'
                            type="text"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            placeholder="(xx) x xxxx-xxxx"
                            required
                        />
                    </div>


                    <button type="button" onClick={cadastroFuncionario} className='botao-cadastro-funcionario'>{botaoCadastro}</button>

                </form>
            </div>
        </div>
    );
}
