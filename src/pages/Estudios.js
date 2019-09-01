import React, { useState, useEffect } from 'react'
import List from './List'
import api from '../services/api'

export default function Estudios(props) {
    const [loading, setLoading] = useState(true)
    const [estudios, setEstudios] = useState([])
    const { state: credentials } = props.location
    const { history } = props;
    useEffect(() => {
        async function loadData() {
            setLoading(true)
            const { data } = await api.post(`/estudios`, credentials)
            setEstudios(data)
            setLoading(false)
        }
        loadData()
    }, [credentials])
    return (
        <div className="panel-container">
            {loading
                ? <div className="loader" />
                : <List elements={estudios} path="estudios" credentials={credentials} arg1="nome" arg2="sede" history={history} />
            }
        </div>
    )
}