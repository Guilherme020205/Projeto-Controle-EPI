import './style.css';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

// Importação dos ícones
import { TbSunglassesFilled } from "react-icons/tb"; // Tipo Óculos
import { FaHelmetSafety, FaVest } from "react-icons/fa6"; // Capacete e Colete
import { FaHeadSideMask, FaHeadphones } from "react-icons/fa"; // Máscara e Fone
import { GiWinterGloves, GiLeatherBoot } from "react-icons/gi"; // Luvas e Botas

export default function PgEpis() {
    const [epis, setEpis] = useState([]);
    const [tipoEpis, setTipoEpis] = useState([]);
    const [tipoIcones, setTipoIcones] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        listarEpis();
        listarTipo();
    }, []);

    const listarEpis = async () => {
        try {
            const url = "http://localhost:8080/epiController";
            const resposta = await axios.get(url);
            setEpis(resposta.data);
        } catch (error) {
            console.error("Erro ao listar EPIs:", error);
        }
    };

    const listarTipo = async () => {
        try {
            const url = "http://localhost:8080/tipos";
            const resposta = await axios.get(url);
            setTipoEpis(resposta.data);

            // Gera o mapeamento dinâmico de ícones
            const icones = {
                "Oculos": <TbSunglassesFilled />,
                "Capacete": <FaHelmetSafety />,
                "Mascara": <FaHeadSideMask />,
                "Luva": <GiWinterGloves />,
                "Fone": <FaHeadphones />,
                "Colete": <FaVest />,
                "Bota": <GiLeatherBoot />
            };

            // Cria um objeto com id como chave e o ícone correspondente como valor
            const mapeamentoIcones = resposta.data.reduce((map, tipo) => {
                map[tipo.id] = icones[tipo.nome] || "Tipo não encontrado";
                return map;
            }, {});

            setTipoIcones(mapeamentoIcones);
        } catch (error) {
            console.error("Erro ao listar tipo EPIs:", error);
        }
    };

    return (
        <div className='div-principal'>
            <div className='box-geral-epis'>
                <div>
                    {epis.length > 0 ? (
                        <ul>
                            {epis.map((epi) => (
                                <li key={epi.id} className='box-list-epi'>
                                    <div className='box-nome-epi'>
                                        <p>{epi.nome}</p>
                                    </div>

                                    <div className='box-opcoes-epi'>
                                        <button>
                                            <a href={`http://localhost:5173/home/epis/editar/${epi.id}`}>
                                                {tipoIcones[epi.idTipo] || "Tipo não encontrado"}
                                            </a>
                                        </button>

                                        <div className='box-estoque-epi'>
                                            <p className='p-entrada'>{epi.quantidade_estoque} un</p>
                                            <p className='p-saida'>{epi.quantidade_saida} un</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Carregando EPIs ou nenhum EPI cadastrado.</p>
                    )}
                </div>
                <div className='box-botao-epis'>
                    <button onClick={() => { navigate('/home/epis/cadastro') }}>Cadastrar EPI</button>
                </div>
            </div>
        </div>
    );
}
