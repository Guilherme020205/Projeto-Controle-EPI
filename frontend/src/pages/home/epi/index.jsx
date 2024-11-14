// import './style.css';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function PgEpis() {

    const [epis, setEpis] = useState([]);

    useEffect(() => {
        listarEpis();
    }, []);

    const navigate = useNavigate();


    const listarEpis = async () => {
        try {
            const url = "http://localhost:8080/epiController";
            const resposta = await axios.get(url);
            setEpis(resposta.data);
        } catch (error) {
            console.error("Erro ao listar EPIs:", error);
        }
    };

    return (
        <div className='div-principal'>
            <div>
                <div>
                    {epis.length > 0 ? (
                        <ul>
                            {epis.map((epi) => (
                                <li key={epi.id}>
                                    <p>{epi.nome}</p>

                                    <button>
                                        <a href={`http://localhost:5173/home/epis/editar/${epi.id}`}> Editar </a>
                                    </button>

                                    <p>Estoque: {epi.quantidade_estoque}</p>
                                    <p>Saída: {epi.quantidade_saida}</p>
                                    <br />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Carregando EPIs ou nenhum EPI cadastrado.</p>
                    )}
                </div>
                <div>
                    <button onClick={() => { navigate('/home/epis/cadastro') }}>Cadastrar EPI</button>
                </div>
            </div>
        </div>
    );
}
