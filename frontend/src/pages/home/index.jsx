import './style.css'
import { CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";


export default function PgHome() {

    const navigate = useNavigate();

    async function logout_button() {
        navigate('/');
    }

    return (

        <div className="div-principal">
            <div className='box-principal-home'>
                <div className='box-funcionario-online'>
                    
                    <h1>Funcionario Online</h1>
 
                </div>

                <div className="box-button-sair">

                    <button onClick={logout_button}>Sair <CiLogin className="icon-CiLogin" /></button>

                </div>
            </div>
        </div>

    )
}