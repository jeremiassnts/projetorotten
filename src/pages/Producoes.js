import React, { useState, useEffect } from 'react'
import { useGlobal } from 'reactn'
import api from '../services/api'
import List from './List'

export default function Producoes({ history }) {
    const [loading, setLoading] = useState(true)
    const [host] = useGlobal('host')
    const [port] = useGlobal('port')
    const [database] = useGlobal('database')
    const [user] = useGlobal('user')
    const [password] = useGlobal('password')
    const [producoes, setProducoes] = useState([])
    useEffect(() => {
        async function loadData() {
            setLoading(true);
            const credentials = { host, port, database, user, password }
            const { data } = await api.post('/producoes', credentials)
            data.forEach(prod => {
                prod.datalancamento = (new Date(Date.parse(prod.datalancamento))).getFullYear();
            });
            setProducoes(data);
            setLoading(false);
        }
        loadData();
    }, [host, port, database, user, password])
    return (
        <div className="panel-container">
            {loading
                ? <div className="loader" />
                : <List elements={producoes} path="producoes" arg1="titulo" arg2="datalancamento" history={history} options={true} setLoading={setLoading} />
            }
        </div>
    )
}