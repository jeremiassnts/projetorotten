import React, { useState, useEffect } from 'react'
import { useGlobal } from 'reactn'
import List from './List'
import api from '../services/api'

export default function Artistas({ history }) {
    const [loading, setLoading] = useState(true)
    const [host] = useGlobal('host')
    const [port] = useGlobal('port')
    const [database] = useGlobal('database')
    const [user] = useGlobal('user')
    const [password] = useGlobal('password')
    const [artistas, setArtistas] = useState([])
    useEffect(() => {
        async function loadData() {
            setLoading(true)
            const credentials = { host, port, database, user, password }
            const { data } = await api.post(`/artistas`, credentials)
            setArtistas(data)
            setLoading(false)
        }
        loadData()
    }, [host, port, database, user, password])
    return (
        <div className="panel-container">
            {loading
                ? <div className="loader" />
                : <List elements={artistas} path="artistas" arg1="nome" history={history} />
            }
        </div>
    )
}