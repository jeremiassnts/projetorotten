import React, { useState, useEffect } from 'react'
import { useGlobal } from 'reactn'
import api from '../services/api'
import '../styles/Insert.css'

export default function Insert({ history }) {
    const [loading, setLoading] = useState(true)
    const [titulo, setTitulo] = useState("");
    const [classificacaoindicativa, setClassificacaoIndicativa] = useState(0);
    const [pais, setPais] = useState("");
    const [sinopse, setSinopse] = useState("");
    const [datalancamento, setDataLancamento] = useState(new Date().toISOString().split('T')[0]);
    const [idioma, setIdioma] = useState("")
    const [duracao, setDuracao] = useState(0)
    const [orcamento, setOrcamento] = useState(0)
    const [emissora, setEmissora] = useState("")
    const [isMovie, setIsMovie] = useState(true)
    const [estudios, setEstudios] = useState([])
    const [estudioId, setEstudioId] = useState("0")
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
            const { data } = await api.post('/estudios', credentials)
            setEstudios(data)
            setLoading(false)
        }
        loadData()
    }, [host, port, database, user, password])

    async function handleClick(ev) {
        ev.preventDefault()
        if (loading) return;
        setLoading(true)
        const credentials = { host, port, database, user, password }
        const producao = {
            titulo,
            classificacaoindicativa,
            pais,
            sinopse,
            datalancamento,
            idioma,
            isMovie,
            filme: {
                duracao,
                orcamento,
                estudioId: parseInt(estudioId)
            },
            serie: {
                emissora
            }
        }
        //Checa campos
        if (!titulo || titulo.trim() === "") {
            alert("Campo de Título deve ser preenchido!")
            setLoading(false)
            return
        } else if (classificacaoindicativa < 0 || classificacaoindicativa > 18) {
            alert("Classificação indicativa deve estar entre 0 e 18!")
            setLoading(false)
            return
        } else if (!pais || pais.trim() === "") {
            alert("Campo País deve ser preenchido!")
            setLoading(false)
            return
        }
        else if (!sinopse || sinopse.trim() === "") {
            alert("Campo Sinopse deve ser preenchido!")
            setLoading(false)
            return
        }
        else if (!idioma || idioma.trim() === "") {
            alert("Campo Idioma deve ser preenchido!")
            setLoading(false)
            return
        }
        else if (isMovie && duracao <= 0) {
            alert("Campo Duração deve ser maior que zero!")
            setLoading(false)
            return
        }
        else if (isMovie && orcamento <= 0) {
            alert("Campo Orçamento deve ser maior que zero!")
            setLoading(false)
            return
        }
        else if (isMovie && estudioId == 0) {
            alert("Selecione um estúdio!")
            setLoading(false)
            return
        }
        else if (!isMovie && (!emissora || emissora.trim() === "")) {
            alert("Campo Emissora deve ser preenchido!")
            setLoading(false)
            return
        }
        const body = { ...credentials, producao }
        await api.post('/insert', body)
        history.push('/producoes')
    }

    return (
        (
            <div className="panel-container">
                <div className="login-container">
                    <form id="editForm" style={{
                        maxWidth: "50vw"
                    }}>
                        <label className="login-label">Inserir produção</label>
                        <div className="input-container">
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
                        </div>
                        <div className="input">
                            <label>Tipo produção</label>
                            <div className="radio-producao">
                                <div><input type="radio" name="tipoProducao" checked={isMovie} value="filme" onChange={() => setIsMovie(true)} />Filme</div>
                                <div><input type="radio" name="tipoProducao" checked={!isMovie} value="serie" onChange={() => setIsMovie(false)} />Série</div>
                            </div>
                        </div>
                        {isMovie ? <div className="filme-container">
                            <div>
                                <label>Duração</label>
                                <input type="number" value={duracao} onChange={e => setDuracao(e.target.value)} />
                            </div>
                            <div>
                                <label>Orçamento</label>
                                <input type="number" value={orcamento} onChange={e => setOrcamento(e.target.value)} />
                            </div></div> : ""
                        }
                        {
                            isMovie ? <div className="input">
                                <label>Estúdio</label>
                                <select disabled={loading} onChange={ev => setEstudioId(ev.target.value)}>
                                    <option value="0" />
                                    {estudios.map(estudio => <option value={estudio.id} key={estudio.id}>{estudio.nome}</option>)}
                                </select>
                            </div> : ""
                        }
                        {!isMovie ? <div className="input">
                            <label>Emissora</label>
                            <input type="text" value={emissora} onChange={e => setEmissora(e.target.value)} />
                        </div> : ""}
                        <button onClick={handleClick} type="submit">{loading ? <div className="loader" style={{ margin: "auto" }}></div> : "Salvar"}</button>
                    </form>
                </div>
            </div>
        )
    )
}