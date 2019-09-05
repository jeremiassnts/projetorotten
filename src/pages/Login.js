import React, { useState } from 'react'
import { useGlobal } from 'reactn'
import api from '../services/api'
import '../styles/Login.css'

export default function Login({ history }) {
    const [loading, setLoadingValue] = useState(false)
    const [host, setHostValue] = useGlobal('host')
    const [port, setPortValue] = useGlobal('port')
    const [database, setDatabaseValue] = useGlobal('database')
    const [user, setUserValue] = useGlobal('user')
    const [password, setPasswordValue] = useGlobal('password')

    async function handleSubmit(e) {
        e.preventDefault();
        if (loading) return;
        setLoadingValue(true);
        const pg = {
            host,
            port,
            database,
            user,
            password
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
                <div className="input">
                    <label>Host</label>
                    <input type="text" value={host} onChange={e => setHostValue(e.target.value)} />
                </div>
                <div className="input">
                    <label>Porta</label>
                    <input type="number" value={port} onChange={e => setPortValue(e.target.value)} />
                </div>
                <div className="input">
                    <label>Banco de Dados</label>
                    <input type="text" value={database} onChange={e => setDatabaseValue(e.target.value)} />
                </div>
                <div className="input">
                    <label>Usuário</label>
                    <input type="text" value={user} onChange={e => setUserValue(e.target.value)} />
                </div>
                <div className="input">
                    <label>Senha</label>
                    <input type="password" value={password} onChange={e => setPasswordValue(e.target.value)} />
                </div>
                <button type="submit">{loading ? <div className="loader" style={{ margin: "auto" }}></div> : "Acessar"}</button>
            </form>
        </div>
    )
}