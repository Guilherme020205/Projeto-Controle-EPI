import "./style.css"
import axios from "axios"
import { useEffect, useState } from "react"
import { BiSolidLike } from "react-icons/bi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function PgPedidos() {
    const [listaPedidos, setListaPedidos] = useState([]);
    const [modalState, setModalState] = useState({});

    useEffect(() => {
        listarPedidos();
    }, []);
    const navigate = useNavigate();

    const listarPedidos = async () => {
        try {
            const url = "http://localhost:8080/listaController";
            const resposta = await axios.get(url);
            setListaPedidos(resposta.data);
            console.log(resposta.data);

        } catch (error) {
            console.log("Erro ao listar pedidos:", error);
        }
    }

    const pedidoDevolvido = async (id) => {
        try {
            const url = `http://localhost:8080/listaController/${id}`;
            const resposta = await axios.put(url);
            location.reload()
            return resposta;
        } catch (error) {
            console.log("Erro ao concluir pedido:", error);
        }
    }

    // Função para alternar o estado do modal
    const toggleModal = (id) => {
        setModalState(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    }

    return (
        <div className="div-principal">
            <div className="box-geral-lista">
                <div className='box-lista-pedidos'>
                    {listaPedidos.length > 0 ? (
                        <ul className="box-ul1-pedido">
                            {listaPedidos.map((pedido) => (
                                <li key={pedido.id} className="li-pricipal">
                                    <div className="box-1-pedido">
                                        <p>{pedido.funcionario}</p>
                                        <p className="p-data">{pedido.dataPedido}</p>
                                    </div>
                                    <div className="box-2-pedido">
                                        <button onClick={() => pedidoDevolvido(pedido.id)}><BiSolidLike /></button>
                                        {/* Botão para abrir/fechar o modal */}
                                        <button onClick={() => toggleModal(pedido.id)}>
                                            {modalState[pedido.id] ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                                        </button>
                                    </div>
                                    <br />
                                    {/* Lista de itens, visível se modalState for true */}
                                    <ul className={`ul-modal ${modalState[pedido.id] ? 'show' : ''}`}>
                                        {pedido.itens.map((item, index) => (
                                            <li key={index}>
                                                <p>{item.quantidade}un - {item.nome}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Carregando pedidos ou nenhum pedido cadastrado.</p>
                    )}
                </div>
                <div className='box-botao-lista'>
                    <button onClick={() => { navigate('/home/pedidos/cadastro') }}>Cadastrar Pedido</button>
                </div>
            </div>
        </div>
    );
}
