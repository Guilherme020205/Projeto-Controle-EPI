import './style.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


export default function PgCadastroPedido() {
    const [idFuncionario, setIdFuncionario] = useState('');
    const [funcionarios, setFuncionarios] = useState([]);
    const [epis, setEpis] = useState([]);
    const [botaoCadastro, setBotaoCadastro] = useState("Cadastrar Pedido");
    const [pedido, setPedido] = useState({
        idOculos: null,
        quantidadeOculos: null,
        idMascara: null,
        quantidadeMascara: null,
        idLuva: null,
        quantidadeLuva: null,
        idBota: null,
        quantidadeBota: null,
        idCapacete: null,
        quantidadeCapacete: null,
        idFone: null,
        quantidadeFone: null,
        idColete: null,
        quantidadeColete: null,
    });
    const navigate = useNavigate();

    useEffect(() => {
        listarFuncionarios();
        listarEpis();
    }, []);

    const listarFuncionarios = async () => {
        try {
            const url = "http://localhost:8080/funcionarios";
            const resposta = await axios.get(url);
            setFuncionarios(resposta.data);
        } catch (error) {
            console.error("Erro ao listar funcionários:", error);
        }
    };

    const listarEpis = async () => {
        try {
            const url = "http://localhost:8080/epiController";
            const resposta = await axios.get(url);
            setEpis(resposta.data);
        } catch (error) {
            console.error("Erro ao listar EPIs:", error);
        }
    };

    const filtrarEpisPorTipo = (tipoId) => {
        return epis.filter(epi => epi.idTipo === tipoId);
    };

    const verificarTodosEstoques = () => {
        const erros = [];
        const verificarQuantidade = (idEpi, quantidade, nome) => {
            const epiSelecionado = epis.find(epi => epi.id === idEpi);
            if (epiSelecionado && quantidade > epiSelecionado.quantidade_estoque) {
                erros.push(
                    `Quantidade de ${nome} excede o estoque disponível (${epiSelecionado.quantidade_estoque}).`
                );
            }
        };

        verificarQuantidade(pedido.idOculos, pedido.quantidadeOculos, 'Óculos');
        verificarQuantidade(pedido.idMascara, pedido.quantidadeMascara, 'Máscara');
        verificarQuantidade(pedido.idLuva, pedido.quantidadeLuva, 'Luva');
        verificarQuantidade(pedido.idBota, pedido.quantidadeBota, 'Bota');
        verificarQuantidade(pedido.idCapacete, pedido.quantidadeCapacete, 'Capacete');
        verificarQuantidade(pedido.idFone, pedido.quantidadeFone, 'Fone');
        verificarQuantidade(pedido.idColete, pedido.quantidadeColete, 'Colete');

        return erros;
    };

    const cadastroPedido = async () => {
        setBotaoCadastro("Cadastrando...");

        const erros = verificarTodosEstoques();

        if (erros.length > 0) {
            setBotaoCadastro("Cadastrar Pedido");
            erros.forEach((erro) => toast.error(erro));
            return;
        }

        try {
            const url = "http://localhost:8080/listaController";
            const novoPedido = { devolvido: false, idFuncionario, ...pedido };

            const resposta = await axios.post(url, novoPedido);

            if (resposta.status === 201) {
                toast.success('Pedido cadastrado com sucesso!');
                navigate('/home/pedidos');
            }
        } catch (error) {
            setBotaoCadastro("Cadastrar Pedido");
            console.error("Erro ao cadastrar pedido:", error);
            toast.error('Erro ao cadastrar pedido. Tente novamente.');
        }
    };

    const imagemBoneco = "https://img.freepik.com/vetores-premium/trabalhador-com-equipamentos-de-protecao-pessoal-e-icones-de-seguranca_7547-22.jpg?w=360"
    return (
        <div className="div-principal">
            <ToastContainer />
            <div>
                <form className='box-form'>

                    <div className='box-info-funcionario'>
                        <select
                            value={idFuncionario}
                            onChange={(e) => setIdFuncionario(e.target.value)}
                            required
                        >
                            <option value="">Nome Funcionário</option>
                            {funcionarios.map((funcionario) => (
                                <option key={funcionario.id} value={funcionario.id}>{funcionario.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className='box-div-pai'>

                        <div className='box-div-filho1'>

                            <div className='box-informacao'>
                                <select
                                    value={pedido.idOculos}
                                    onChange={(e) =>
                                        setPedido({ ...pedido, idOculos: e.target.value })
                                    }
                                >
                                    <option value="">-- Óculos</option>
                                    {filtrarEpisPorTipo("1016624272504815617").map((epi) => (
                                        <option key={epi.id} value={epi.id}>
                                            {epi.nome}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    value={pedido.quantidadeOculos}
                                    onChange={(e) => {
                                        let value = parseInt(e.target.value, 10) || 0;
                                        if (value > 1) value = 1;
                                        if (value < 0) value = 0;

                                        setPedido({ ...pedido, quantidadeOculos: value });
                                    }}
                                    placeholder="0"
                                    min="0"
                                    max="1"
                                />

                            </div>

                            <div className='box-informacao'>
                                <select
                                    value={pedido.idMascara}
                                    onChange={(e) =>
                                        setPedido({ ...pedido, idMascara: e.target.value })
                                    }
                                >
                                    <option value="">-- Faciais</option>
                                    {filtrarEpisPorTipo("1016624307473547265").map((epi) => (
                                        <option key={epi.id} value={epi.id}>
                                            {epi.nome}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    value={pedido.quantidadeMascara}
                                    onChange={(e) => {
                                        let value = parseInt(e.target.value, 10) || 0;
                                        if (value > 1) value = 1;
                                        if (value < 0) value = 0;

                                        setPedido({ ...pedido, quantidadeMascara: value });
                                    }}
                                    placeholder="0"
                                    min="0"
                                    max="1"
                                />
                            </div>

                            <div className='box-informacao'>
                                <select
                                    value={pedido.idLuva}
                                    onChange={(e) =>
                                        setPedido({ ...pedido, idLuva: e.target.value })
                                    }
                                >
                                    <option value="">-- Luva</option>
                                    {filtrarEpisPorTipo("1016624324353785857").map((epi) => (
                                        <option key={epi.id} value={epi.id}>
                                            {epi.nome}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    value={pedido.quantidadeLuva}
                                    onChange={(e) => {
                                        let value = parseInt(e.target.value, 10) || 0;
                                        if (value > 1) value = 1;
                                        if (value < 0) value = 0;

                                        setPedido({ ...pedido, quantidadeLuva: value });
                                    }}
                                    placeholder="0"
                                    min="0"
                                    max="1"
                                />
                            </div>

                            <div className='box-informacao'>
                                <select
                                    value={pedido.idBota}
                                    onChange={(e) =>
                                        setPedido({ ...pedido, idBota: e.target.value })
                                    }
                                >
                                    <option value="">-- Calçados</option>
                                    {filtrarEpisPorTipo("1016624338694471681").map((epi) => (
                                        <option key={epi.id} value={epi.id}>
                                            {epi.nome}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    value={pedido.quantidadeBota}
                                    onChange={(e) => {
                                        let value = parseInt(e.target.value, 10) || 0;
                                        if (value > 1) value = 1;
                                        if (value < 0) value = 0;

                                        setPedido({ ...pedido, quantidadeBota: value });
                                    }}
                                    placeholder="0"
                                    min="0"
                                    max="1"
                                />
                            </div>

                        </div>

                        <div className='box-div-filho2'>

                            <img src={imagemBoneco} alt="imagemBoneco" />


                        </div>

                        <div className='box-div-filho3'>

                            <div className='box-informacao'>
                                <select
                                    value={pedido.idCapacete}
                                    onChange={(e) =>
                                        setPedido({ ...pedido, idCapacete: e.target.value })
                                    }
                                >
                                    <option value="">-- Capacete</option>
                                    {filtrarEpisPorTipo("1016624261619580929").map((epi) => (
                                        <option key={epi.id} value={epi.id}>
                                            {epi.nome}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    value={pedido.quantidadeCapacete}
                                    onChange={(e) => {
                                        let value = parseInt(e.target.value, 10) || 0;
                                        if (value > 1) value = 1;
                                        if (value < 0) value = 0;

                                        setPedido({ ...pedido, quantidadeCapacete: value });
                                    }}
                                    placeholder="0"
                                    min="0"
                                    max="1"
                                />
                            </div>

                            <div className='box-informacao'>
                                <select
                                    value={pedido.idFone}
                                    onChange={(e) =>
                                        setPedido({ ...pedido, idFone: e.target.value })
                                    }
                                >
                                    <option value="">-- Auriculares/Abafadores</option>
                                    {filtrarEpisPorTipo("1016624281894060033").map((epi) => (
                                        <option key={epi.id} value={epi.id}>
                                            {epi.nome}
                                        </option>
                                    ))}
                                </select>
                               
                                <input
                                    type="number"
                                    value={pedido.quantidadeFone}
                                    onChange={(e) => {
                                        let value = parseInt(e.target.value, 10) || 0;
                                        if (value > 1) value = 1;
                                        if (value < 0) value = 0;

                                        setPedido({ ...pedido, quantidadeFone: value });
                                    }}
                                    placeholder="0"
                                    min="0"
                                    max="1"
                                />
                            </div>

                            <div className='box-informacao'>
                                <select
                                    value={pedido.idColete}
                                    onChange={(e) =>
                                        setPedido({ ...pedido, idColete: e.target.value })
                                    }
                                >
                                    <option value="">-- Vestimentas</option>
                                    {filtrarEpisPorTipo("1016624292819959809").map((epi) => (
                                        <option key={epi.id} value={epi.id}>
                                            {epi.nome}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    value={pedido.quantidadeColete}
                                    onChange={(e) => {
                                        let value = parseInt(e.target.value, 10) || 0;
                                        if (value > 1) value = 1;
                                        if (value < 0) value = 0;

                                        setPedido({ ...pedido, quantidadeColete: value });
                                    }}
                                    placeholder="0"
                                    min="0"
                                    max="1"
                                />
                            </div>

                        </div>

                    </div>
                    <button type="button" onClick={cadastroPedido} className='botao-cadastro-pedido'>{botaoCadastro}</button>
                </form>
            </div>
        </div>
    );
}
