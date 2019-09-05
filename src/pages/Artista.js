import React, { useState, useEffect } from 'react'
import api from '../services/api'
import List from './List'
import { useGlobal } from 'reactn'
import '../styles/Artista.css'

export default function Artista({ history, match }) {
    const [loading, setLoading] = useState(true)
    const [artista, setArtista] = useState({})
    const [host] = useGlobal('host')
    const [port] = useGlobal('port')
    const [database] = useGlobal('database')
    const [user] = useGlobal('user')
    const [password] = useGlobal('password')
    const { artistaId } = match.params
    useEffect(() => {
        async function loadData() {
            setLoading(true)
            const credentials = { host, port, database, user, password }
            const { data } = await api.post(`/artistas/${artistaId}`, credentials)
            setArtista(data)
            setLoading(false)
        }
        loadData()
    }, [artistaId])
    return (
        <div className="panel-container">
            {loading
                ? <div className="loader" />
                : <div className="artista-panel-container">
                    <div className="artista-container">
                        <div>
                            <span>{artista.nome}</span>
                        </div>
                        <div>
                            <span>{getIdade(artista.datanascimento)} anos</span>
                            <span>{artista.pais}</span>
                        </div>
                    </div>
                    <List elements={artista.producoes} path="producoes" arg1="titulo" arg2="nome" history={history} height={60} />
                </div>
            }
        </div>
    )
}

function getIdade(data) {
    let parsedData = new Date(Date.parse(data))
    let today = new Date()
    return today.getFullYear() - parsedData.getFullYear()
}