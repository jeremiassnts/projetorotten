import React, { useState, useEffect } from 'react'
import { useGlobal } from 'reactn'
import api from '../services/api'
import '../styles/Producao.css'

export default function Producao({ match }) {
    const [loading, setLoading] = useState(true)
    const [host] = useGlobal('host')
    const [port] = useGlobal('port')
    const [database] = useGlobal('database')
    const [user] = useGlobal('user')
    const [password] = useGlobal('password')
    const [producao, setProducao] = useState({})
    const { producaoId } = match.params;
    useEffect(() => {
        async function loadData() {
            setLoading(true)
            const credentials = { host, port, database, user, password }
            const { data } = await api.post(`/producoes/${producaoId}`, credentials)
            setProducao(data)
            setLoading(false)
        }
        loadData()
    }, [producaoId])
    return (
        <div className="panel-container">
            {loading
                ? <div className="loader" />
                : <div className="specific-producao-container">
                    <div className="producao-principal-container">
                        <div>
                            <span>{producao.titulo}</span>
                            <span>{producao.notas.length === 0 ? "Sem avaliações" : (producao.notas.reduce((el, a) => a += el, 0) / (producao.notas.length)) / 10}/10</span>
                        </div>
                        <div>
                            <span>{producao.classificacaoindicativa}</span>
                            {producao.duracao !== null ? <span>{getDuracao(producao.duracao)}</span> : ""}
                            <span>{producao.estudio ? producao.estudio : producao.emissora}</span>
                            <span>{producao.pais}</span>
                        </div>
                    </div>
                    <p>{producao.sinopse}</p>
                    <div className="criticas-container">
                        {producao.criticas.map(critica => <div className="critica-container" key={critica.id}>
                            <span>{critica.critica}</span>
                            <footer>
                                <span>{critica.nome} - {critica.entidade}</span>
                                <span>{critica.cargo}</span>
                            </footer>
                        </div>)}
                    </div>
                </div>
            }
        </div>
    )
}
export function getDuracao(total) {
    let horas = Math.floor(total / 60)
    let parcialMinutos = total / 60 - horas
    let minutos = Math.ceil(60 * parcialMinutos)
    return `${horas}h ${minutos}min`
}