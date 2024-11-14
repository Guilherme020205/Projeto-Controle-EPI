import './style.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ImBin2 } from "react-icons/im";

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


export default function PgEditarFuncionario() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [funcionario, setFuncionario] = useState(null);
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [idSetor, setIdSetor] = useState('');
    const [setores, setSetores] = useState([]);

    useEffect(() => {
        // Carregar os dados do funcionário e setores
        buscarFuncionarioPorId();
        listarSetores();
    }, [id]);

    const buscarFuncionarioPorId = async () => {
        try {
            const url = `http://localhost:8080/funcionarios/${id}`;
            const resposta = await axios.get(url);
            setFuncionario(resposta.data);
            setNome(resposta.data.nome);
            setTelefone(resposta.data.telefone);
            setIdSetor(resposta.data.idSetor);
        } catch (error) {
            console.error('Erro ao buscar funcionário:', error);
            toast.error('Erro ao carregar os dados do funcionário.');
        }
    };

    const listarSetores = async () => {
        try {
            const url = 'http://localhost:8080/setores';
            const resposta = await axios.get(url);
            setSetores(resposta.data);
        } catch (error) {
            console.error('Erro ao listar setores:', error);
            toast.error('Erro ao carregar os setores.');
        }
    };

    const editarFuncionario = async () => {
        try {
            const url = `http://localhost:8080/funcionarios/${id}`;
            const funcionarioAtualizado = { nome, telefone, idSetor };
            const resposta = await axios.put(url, funcionarioAtualizado);
            setFuncionario(resposta.data);
            navigate('/home/funcionarios')
        } catch (error) {
            console.error('Erro ao editar funcionário:', error);
            toast.error('Erro ao atualizar o funcionário.');
        }
    };

    const excluirFuncionario = async () => {
        try {
            const url = `http://localhost:8080/funcionarios/${id}`;
            const resposta = await axios.delete(url);

            navigate('/home/funcionarios');  // Redireciona após excluir
        } catch (error) {
            console.error('Erro ao excluir funcionário:', error);
            toast.error('Erro ao excluir o funcionário.');
        }
    };

    if (!funcionario) {
        return <div className="div-principal">Carregando...</div>;
    }

    return (
        <div className="div-principal">
            <ToastContainer />
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
                        {setores.map((setor) => (
                            <option key={setor.id} value={setor.id}>{setor.nome}</option>
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
                <div className='box-buttons-interacao'>
                    <button type="button" onClick={editarFuncionario} className='botao-editar-funcionario'>
                        Salvar alterações
                    </button>
                    <button type="button" onClick={excluirFuncionario} className='botao-excluir-funcionario'><ImBin2 /></button>
                </div>
            </form>
        </div>
    );
}
