// import './style.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ImBin2 } from "react-icons/im";

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function PgEditarEpi() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [epi, setEpi] = useState(null);
    const [nome, setNome] = useState('');
    const [quantidadeEstoque, setQuantidadeEstoque] = useState('');
    const [quantidadeSaida, setQuantidadeSaida] = useState('');
    const [idTipo, setIdTipo] = useState('');
    const [tipos, setTipos] = useState([]);

    useEffect(() => {

        buscarEpiPorId();
        listarTipos();
    }, [id]);

    const buscarEpiPorId = async () => {
        try {
            const url = `http://localhost:8080/epiController/${id}`;
            const resposta = await axios.get(url);
            setEpi(resposta.data);
            setNome(resposta.data.nome);
            setQuantidadeEstoque(resposta.data.quantidade_estoque);
            setQuantidadeSaida(resposta.data.quantidade_saida);
            setIdTipo(resposta.data.idTipo);
        } catch (error) {
            console.error('Erro ao buscar EPI:', error);
            toast.error('Erro ao carregar os dados do EPI.');
        }
    };

    const listarTipos = async () => {
        try {
            const url = 'http://localhost:8080/tipos';   
            const resposta = await axios.get(url);
            setTipos(resposta.data);
        } catch (error) {
            console.error('Erro ao listar tipos de EPI:', error);
            toast.error('Erro ao carregar os tipos de EPI.');
        }
    };

    const editarEpi = async () => {
        try {
            const url = `http://localhost:8080/epiController/${id}`;
            const epiAtualizado = { nome, idTipo, quantidade_estoque: quantidadeEstoque, quantidade_saida: quantidadeSaida };
            const resposta = await axios.put(url, epiAtualizado);
            setEpi(resposta.data);
            navigate('/home/epis');
        } catch (error) {
            console.error('Erro ao editar EPI:', error);
            toast.error('Erro ao atualizar o EPI.');
        }
    };

    const excluirEpi = async () => {
        try {
            const url = `http://localhost:8080/epiController/${id}`;
            const resposta = await axios.delete(url);

            navigate('/home/epis');   
        } catch (error) {
            console.error('Erro ao excluir EPI:', error);
            toast.error('Erro ao excluir o EPI.');
        }
    };

    if (!epi) {
        return <div className="div-principal">Carregando...</div>;
    }

    return (
        <div className="div-principal">
            <ToastContainer />
            <form className='box-form'>
                <div className='box-info'>
                    <label>Nome do EPI</label>
                    <input
                        className='input-nome'
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="ex: Luva de segurança"
                        required
                    />
                </div>

                <div className='box-info'>
                    <label>Tipo de EPI</label>
                    <select
                        className='select-tipos'
                        value={idTipo}
                        onChange={(e) => setIdTipo(e.target.value)}
                        required
                    >
                        <option value={null}>-- Selecionar</option>
                        {tipos.map((tipo) => (
                            <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
                        ))}
                    </select>
                </div>

                <div className='box-info'>
                    <label>Quantidade em Estoque</label>
                    <input
                        className='input-quantidade'
                        type="number"
                        value={quantidadeEstoque}
                        onChange={(e) => setQuantidadeEstoque(e.target.value)}
                        placeholder="Quantidade em estoque"
                        required
                    />
                </div>

                <div className='box-info'>
                    <label>Quantidade Saída</label>
                    <input
                        className='input-quantidade'
                        type="number"
                        value={quantidadeSaida}
                        onChange={(e) => setQuantidadeSaida(e.target.value)}
                        placeholder="Quantidade saída"
                        required
                    />
                </div>

                <div className='box-buttons-interacao'>
                    <button type="button" onClick={editarEpi} className='botao-editar-epi'>
                        Salvar alterações
                    </button>
                    <button type="button" onClick={excluirEpi} className='botao-excluir-epi'>
                        <ImBin2 />
                    </button>
                </div>
            </form>
        </div>
    );
}
