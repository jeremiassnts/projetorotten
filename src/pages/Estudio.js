import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { useGlobal } from 'reactn'
import List from './List'
import '../styles/Estudio.css'

export default function Estudio({ history, match }) {
    const [loading, setLoading] = useState(true)
    const [estudio, setEstudio] = useState({})
    const { estudioId } = match.params
    const [host] = useGlobal('host')
    const [port] = useGlobal('port')
    const [database] = useGlobal('database')
    const [user] = useGlobal('user')
    const [password] = useGlobal('password')
    useEffect(() => {
        async function loadData() {
            setLoading(true)
            const credentials = { host, port, database, user, password }
            const { data } = await api.post(`/estudios/${estudioId}`, credentials)
            data.producoes.forEach(prod => {
                prod.datalancamento = new Date(Date.parse(prod.datalancamento)).getFullYear()
            })
            setEstudio(data)
            setLoading(false)
        }
        loadData()
    }, [estudioId])
    return (
        <div className="panel-container">
            {loading
                ? <div className="loader" />
                : <div className="estudio-panel-container">
                    <div className="estudio-container">
                        <div>
                            <span>{estudio.nome}</span>
                        </div>
                        <div>
                            <span>{estudio.sede}</span>
                            <span>{new Date(Date.parse(estudio.fundacao)).getFullYear()}</span>
                        </div>
                    </div>
                    <List elements={estudio.producoes} path="producoes" arg1="titulo" arg2="datalancamento" history={history} height={60} />
                </div>
            }
        </div>
    )
}