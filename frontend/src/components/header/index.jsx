import './style.css';
import { IoIosHome, IoIosPeople } from "react-icons/io";
import { FaHelmetSafety, FaClipboardList } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    function trocaTela(tela) {
        navigate(tela);
    }

    // Verifica se a URL corresponde à rota do botão para aplicar a classe ativa
    const isActive = (path) => location.pathname === path ? 'button-active' : '';

    return (
        <div className='header-login'>

            <div className='box-header'>

                <h1>EPI Control</h1>

                {location.pathname !== '/' && ( // Se a URL não for "/", exibe os botões

                    <div className='box-icon'>

                        <button onClick={() => trocaTela("/home")} className={isActive("/home")}>
                            <IoIosHome className='icon-button-header'/>
                        </button>

                        <button onClick={() => trocaTela("/home/epis")} className={isActive("/home/epis")}>
                            <FaHelmetSafety className='icon-button-header'/>
                        </button>

                        <button onClick={() => trocaTela("/home/funcionarios")} className={isActive("/home/funcionarios") || isActive("/home/funcionarios/cadastro")}>
                            <IoIosPeople className='icon-button-header'/>
                        </button>

                        <button onClick={() => trocaTela("/home/pedidos")} className={isActive("/home/pedidos")}>
                            <FaClipboardList className='icon-button-header'/>
                        </button>

                    </div>

                )}

            </div>

        </div>
    );
}
