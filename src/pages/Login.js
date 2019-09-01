import React, { useState } from 'react'
import api from '../services/api'
import '../styles/Login.css'

export default function Login({ history }) {
    const [loading, setLoadingValue] = useState(false)
    const [host, setHostValue] = useState("ec2-50-16-197-244.compute-1.amazonaws.com")
    const [port, setPortValue] = useState(5432)
    const [database, setDatabaseValue] = useState("dagf3knmquj0kj")
    const [user, setUserValue] = useState("jbqcgbigvtunjd")
    const [password, setPasswordValue] = useState("ef76e69d9b77990b51d0a39228d0f2253ac839990f99f07e72467ee2eb8a48a7")

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
                history.push("/main", pg);
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