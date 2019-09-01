import React, { useState, useEffect } from 'react'
import List from './List'
import api from '../services/api'

export default function Artistas(props) {
    const [loading, setLoading] = useState(true)
    const [artistas, setArtistas] = useState([])
    const { state: credentials } = props.location
    const { history } = props;
    useEffect(() => {
        async function loadData() {
            setLoading(true)
            const { data } = await api.post(`/artistas`, credentials)
            setArtistas(data)
            setLoading(false)
        }
        loadData()
    }, [credentials])
    return (
        <div className="panel-container">
            {loading
                ? <div className="loader" />
                : <List elements={artistas} path="artistas" credentials={credentials} arg1="nome" history={history} />
            }
        </div>
    )
}