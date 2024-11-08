import { useState } from "react"
import { CiLogin } from "react-icons/ci";
import "./style.css"
import Header from "./header/index.jsx";

export default function PgLogin() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    return (
        <>
            <header>
                <Header />
            </header>
            
            <div className="box-principal">
                <div className="box-form">
                    <h2>Login no sistema</h2>
                    <form action="">
                        <p>email</p>
                        <input
                            type="email"
                            placeholder="admin@gmail.com"
                            value={email}
                            name="email"
                            required
                        />

                        <p>senha</p>
                        <input
                            type="password"
                            placeholder="admin1"
                            value={senha}
                            name="password"
                            required
                        />

                    </form>
                </div>
                <div className="box-button">
                    <button>Login<CiLogin className="icon-CiLogin" /></button>
                </div>
            </div>
        </>
    )
}