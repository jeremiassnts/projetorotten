import React, { useState, useEffect } from 'react'
import api from '../services/api'
import List from './List'

export default function Producoes(props) {
    const { state: credentials } = props.location;
    const [loading, setLoading] = useState(true)
    const [producoes, setProducoes] = useState([])
    const { history } = props;
    useEffect(() => {
        async function loadData() {
            setLoading(true);
            const { data } = await api.post('/producoes', credentials)
            data.forEach(prod => {
                prod.datalancamento = (new Date(Date.parse(prod.datalancamento))).getFullYear();
            });
            setProducoes(data);
            setLoading(false);
        }
        loadData();
    }, [credentials])
    return (
        <div className="panel-container">
            {loading
                ? <div className="loader" />
                : <List elements={producoes} path="producoes" credentials={credentials} arg1="titulo" arg2="datalancamento" history={history} options={true} setLoading={setLoading}/>
            }
        </div>
    )
}