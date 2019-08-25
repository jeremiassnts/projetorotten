import React, { useState } from 'react'
import api from '../services/api'
import './Login.css'

export default function Login({ history }) {
    const [loading, setLoadingValue] = useState(false)
    async function handleSubmit(e) {
        e.preventDefault();
        if (loading) return;
        setLoadingValue(true);
        let elements = [...e.target.elements]
        elements = elements
            .filter(e => e.localName === 'input')
            .map(e => { return { title: e.title, value: e.value } })
        const pg = {
            host: elements.filter(e => e.title === "host")[0].value,
            port: elements.filter(e => e.title === "port")[0].value,
            database: elements.filter(e => e.title === "database")[0].value,
            user: elements.filter(e => e.title === "user")[0].value,
            password: elements.filter(e => e.title === "password")[0].value,
        }

        try {
            const { data } = await api.post('/check', pg);
            if (data.error) {
                alert(data.message)
                setLoadingValue(false);
            } else {
                history.push("/main");
            }
        }
        catch (err) {
            alert(err);
            setLoadingValue(false);
        }
    }
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <label className="login-label">Dados de acesso</label>
                <Input title="IP" type="text" initialValue="localhost" label="host" />
                <Input title="Porta" type="number" initialValue="5432" label="port" />
                <Input title="Banco de Dados" type="text" initialValue="postgres" label="database" />
                <Input title="Usuário" type="text" initialValue="postgres" label="user" />
                <Input title="Senha" type="password" initialValue="pg147698#" label="password" />
                <button type="submit">{loading ? <div className="loader"></div> : "Acessar"}</button>
            </form>
        </div>
    )
}

function Input(props) {
    const [inputValue, setInputValue] = useState(props.initialValue)
    return (
        <div className="input">
            <label>{props.title}</label>
            <input title={props.label} type={props.type} value={inputValue} onChange={e => setInputValue(e.target.value)} />
        </div>
    )
}