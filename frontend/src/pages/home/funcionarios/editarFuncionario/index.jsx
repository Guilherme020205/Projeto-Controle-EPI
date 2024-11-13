import './style.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function PgEditarFuncionario() {
    const { id } = useParams();  // Pegando o id da URL
    const [funcionario, setFuncionario] = useState(null);  // Agora será apenas um único funcionário
    
    // Função para buscar o funcionário pelo id
    const buscarFuncionarioPorId = async () => {
        try {
            const url = `http://localhost:8080/funcionarios/${id}`;  // URL com o id
            const resposta = await axios.get(url);
            setFuncionario(resposta.data);  // Atualiza o estado com os dados do funcionário
        } catch (error) {
            console.error("Erro ao buscar funcionário:", error);
        }
    };

    // UseEffect para chamar a função de busca assim que o componente for carregado
    useEffect(() => {
        buscarFuncionarioPorId();
    }, [id]);  // Dependência no id para atualizar caso mude

    if (!funcionario) {
        return <div className="div-principal">Carregando...</div>;  // Exibe uma mensagem de carregamento enquanto os dados não chegam
    }

    return (
        <div className="div-principal">
            <h1>Detalhes do Funcionário</h1>
            <p><strong>ID:</strong> {funcionario.id}</p>
            <p><strong>Nome:</strong> {funcionario.nome}</p>
            <p><strong>Setor:</strong> {funcionario.setor ? funcionario.setor.nome : 'Não especificado'}</p>
         </div>
    );
}
