import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


export default function PgCadastroFuncionario() {
    // Estados para armazenar os dados do formulário
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [idSetor, setIdSetor] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [setores, setSetores] = useState([]);

    useEffect(() => {
        listarSetores();
    }, []);
    
    const navigate = useNavigate();
    
    const [botaoCadastro, setBotaoCadastro] = useState("Cadastrar");
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
                setMensagem('Funcionário cadastrado com sucesso!');
                setNome(''); // Limpa o campo nome
                setTelefone(''); // Limpa o campo telefone
                setIdSetor(''); // Limpa o campo idSetor
                navigate('/home/funcionarios')
            }
        } catch (error) {
            await mudarTitulo("Cadastrar")
            console.error("Erro ao cadastrar funcionário:", error);
            setMensagem('Erro ao cadastrar funcionário. Tente novamente.');
        }
    };

    return (
        <div className="div-principal">
            <h1>Cadastrar Funcionário</h1>
            <form>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Digite o nome do funcionário"
                        required
                    />
                </div>
                <div>
                    <label>Telefone:</label>
                    <input
                        type="text"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        placeholder="Digite o telefone do funcionário"
                        required
                    />
                </div>
                <div>

                    <select
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

                <button type="button" onClick={cadastroFuncionario}>{botaoCadastro}</button>

            </form>
            {mensagem && <p>{mensagem}</p>} {/* Exibe a mensagem de sucesso ou erro */}
        </div>
    );
}
