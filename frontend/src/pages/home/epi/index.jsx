import axios from 'axios';
import { useEffect } from 'react';

export default function PgEpis() {

    useEffect(() => {
        listarEpis()
    },[])

    const listarEpis = async () => {
        try{
            const url = "http://localhost:8080/epiController";
            const resposta = await axios.get(url)
            console.log(resposta.data)

        } catch(error) {
            console.log(error)
        }
    }

    return (

        <div className="div-principal">
            <h1>Olá Mundo!</h1>
            
            <p>PgEpis</p> 
            <p>PgEpis</p> 
            <p>PgEpis</p> 
            <p>PgEpis</p> 
            <p>PgEpis</p> 
            <p>PgEpis</p> 
            <p>PgEpis</p> 
            <p>PgEpis</p> 
            <p>PgEpis</p> 
            <p>PgEpis</p> 
            <p>PgEpis</p> 
            
        </div>

    )
}