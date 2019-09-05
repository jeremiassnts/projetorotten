import React, { useState, useEffect } from 'react'
import { useGlobal } from 'reactn'
import List from './List'
import api from '../services/api'

export default function Estudios({ history }) {
    const [loading, setLoading] = useState(true)
    const [host] = useGlobal('host')
    const [port] = useGlobal('port')
    const [database] = useGlobal('database')
    const [user] = useGlobal('user')
    const [password] = useGlobal('password')
    const [estudios, setEstudios] = useState([])
    useEffect(() => {
        async function loadData() {
            setLoading(true)
            const credentials = { host, port, database, user, password }
            const { data } = await api.post(`/estudios`, credentials)
            setEstudios(data)
            setLoading(false)
        }
        loadData()
    }, [host, port, database, user, password])
    return (
        <div className="panel-container">
            {loading
                ? <div className="loader" />
                : <List elements={estudios} path="estudios" arg1="nome" arg2="sede" history={history} />
            }
        </div>
    )
}