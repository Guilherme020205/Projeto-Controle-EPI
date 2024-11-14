// import './style.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function PgCadastroEPI() {

    const [nome, setNome] = useState('');
    const [idTipo, setIdTipo] = useState('');
    const [quantidadeEstoque, setQuantidadeEstoque] = useState('');
    const [tiposEpi, setTiposEpi] = useState([]);
    const [botaoCadastro, setBotaoCadastro] = useState("Cadastrar EPI");

    const navigate = useNavigate();

    useEffect(() => {
        listarTiposEpi();
    }, []);

    const listarTiposEpi = async () => {
        try {
            const url = "http://localhost:8080/tipos";
            const resposta = await axios.get(url);
            setTiposEpi(resposta.data);
        } catch (error) {
            console.error("Erro ao listar tipos de EPI:", error);
        }
    }

    const cadastroEPI = async () => {
        setBotaoCadastro("Cadastrando...");

        try {
            const url = "http://localhost:8080/epiController";
            const novoEpi = {
                nome,
                idTipo,
                quantidade_estoque: quantidadeEstoque,
                quantidade_saida: 0 
            };

            console.log("Enviando dados:", novoEpi);  
            const resposta = await axios.post(url, novoEpi);

            if (resposta.status === 201) {
                 
                setNome('');
                setIdTipo('');
                setQuantidadeEstoque('');
                navigate('/home/epis');
            }
        } catch (error) {
            setBotaoCadastro("Cadastrar EPI");
            console.error("Erro ao cadastrar EPI:", error);
            toast.error('Erro ao cadastrar EPI. Tente novamente.');
        }
    };

    return (
        <div className="div-principal">
            <ToastContainer />
            <div>
                <form className='box-form'>
                    <div className='box-info'>
                        <label>Nome do EPI</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Nome do EPI"
                            required
                        />
                    </div>

                    <div className='box-info'>
                        <label>Tipo de EPI</label>
                        <select
                            value={idTipo}
                            onChange={(e) => setIdTipo(e.target.value)}
                            required
                        >
                            <option value="">-- Selecionar</option>
                            {tiposEpi.map((tipo) => (
                                <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className='box-info'>
                        <label>Quantidade em Estoque</label>
                        <input
                            type="number"
                            value={quantidadeEstoque}
                            onChange={(e) => setQuantidadeEstoque(e.target.value)}
                            required
                        />
                    </div>

                    <button type="button" onClick={cadastroEPI} className='botao-cadastro-epi'>{botaoCadastro}</button>
                </form>
            </div>
        </div>
    );
}
