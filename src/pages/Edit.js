import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { useGlobal } from 'reactn'
import '../styles/Edit.css'

export default function Edit({ history, match }) {
    const { producaoId } = match.params;
    const [loading, setLoading] = useState(true)
    const [titulo, setTitulo] = useState("");
    const [classificacaoindicativa, setClassificacaoIndicativa] = useState(0);
    const [pais, setPais] = useState("");
    const [sinopse, setSinopse] = useState("");
    const [datalancamento, setDataLancamento] = useState(new Date());
    const [idioma, setIdioma] = useState("")
    const [duracao, setDuracao] = useState(null)
    const [emissora, setEmissora] = useState(null)
    //credentials
    const [host] = useGlobal('host')
    const [port] = useGlobal('port')
    const [database] = useGlobal('database')
    const [user] = useGlobal('user')
    const [password] = useGlobal('password')
    useEffect(() => {
        async function loadData() {
            setLoading(true)
            const credentials = { host, port, database, user, password }
            const { data: producao } = await api.post(`producoes/${producaoId}`, credentials)
            setTitulo(producao.titulo)
            setClassificacaoIndicativa(producao.classificacaoindicativa)
            setPais(producao.pais)
            setSinopse(producao.sinopse)
            setDataLancamento(new Date(Date.parse(producao.datalancamento)).toISOString().split('T')[0])
            setDuracao(producao.duracao)
            setEmissora(producao.emissora)
            setIdioma(producao.idioma)
            setLoading(false)
        }
        loadData()
    }, [producaoId])
    async function handleClick(ev) {
        ev.preventDefault();
        const body = {
            host,
            port,
            database,
            user,
            password,
            producao: {
                id: producaoId,
                titulo,
                classificacaoindicativa,
                pais,
                sinopse,
                datalancamento,
                idioma,
                duracao,
                emissora,
                filme: emissora === null && duracao !== null,
                serie: emissora !== null && duracao === null
            }
        }
        setLoading(true)
        await api.put('/producoes', body)
        history.push('/producoes')
    }
    return (
        <div className="panel-container" style={{
            width: "30vw"
        }}>
            {loading
                ? <div className="loader" />
                : <div className="login-container">
                    <form id="editForm">
                        <label className="login-label">Editar produção</label>
                        <div className="input">
                            <label>Título</label>
                            <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} />
                        </div>
                        <div className="input">
                            <label>Classificação indicativa</label>
                            <input type="text" value={classificacaoindicativa} onChange={e => setClassificacaoIndicativa(e.target.value)} />
                        </div>
                        <div className="input">
                            <label>País</label>
                            <input type="text" value={pais} onChange={e => setPais(e.target.value)} />
                        </div>
                        <div className="input">
                            <label>Sinopse</label>
                            <textarea type="text" value={sinopse} onChange={e => setSinopse(e.target.value)} />
                        </div>
                        <div className="input">
                            <label>Data</label>
                            <input type="date" value={datalancamento} onChange={e => setDataLancamento(e.target.value)} />
                        </div>
                        <div className="input">
                            <label>Idioma</label>
                            <input type="text" value={idioma} onChange={e => setIdioma(e.target.value)} />
                        </div>
                        {
                            emissora
                                ? <div className="input">
                                    <label>Emissora</label>
                                    <input type="text" value={emissora} onChange={e => setEmissora(e.target.value)} />
                                </div>
                                : <div className="input">
                                    <label>Duração</label>
                                    <input type="number" value={duracao} onChange={e => setDuracao(e.target.value)} />
                                </div>
                        }
                        <button onClick={handleClick} type="submit">{loading ? <div className="loader" style={{ margin: "auto" }}></div> : "Salvar"}</button>
                    </form>
                </div>
            }
        </div>
    )
}