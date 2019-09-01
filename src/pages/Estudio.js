import React, { useState, useEffect } from 'react'
import api from '../services/api'
import List from './List'
import '../styles/Estudio.css'

export default function Estudio(props) {
    const [loading, setLoading] = useState(true)
    const [estudio, setEstudio] = useState({})
    const { estudioId } = props.match.params
    const { history } = props
    const { state: credentials } = props.location;
    useEffect(() => {
        async function loadData() {
            setLoading(true)
            const { data } = await api.post(`/estudios/${estudioId}`, credentials)
            data.producoes.forEach(prod => {
                prod.datalancamento = new Date(Date.parse(prod.datalancamento)).getFullYear()
            })
            setEstudio(data)
            setLoading(false)
        }
        loadData()
    }, [credentials, estudioId])
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
                    <List elements={estudio.producoes} path="producoes" credentials={credentials} arg1="titulo" arg2="datalancamento" history={history} height={60} />
                </div>
            }
        </div>
    )
}