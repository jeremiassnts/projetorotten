import React, { useState, useEffect } from 'react'
import api from '../services/api'
import List from './List'
import '../styles/Artista.css'

export default function Artista(props) {
    const [loading, setLoading] = useState(true)
    const [artista, setArtista] = useState({})
    const { artistaId } = props.match.params
    const { history } = props
    const { state: credentials } = props.location;
    useEffect(() => {
        async function loadData() {
            setLoading(true)
            const { data } = await api.post(`/artistas/${artistaId}`, credentials)
            setArtista(data)
            setLoading(false)
        }
        loadData()
    }, [credentials, artistaId])
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
                    <List elements={artista.producoes} path="producoes" credentials={credentials} arg1="titulo" arg2="nome" history={history} height={60} />
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