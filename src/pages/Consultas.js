import React, { useEffect, useState } from 'react'
import { useGlobal } from 'reactn'
import api from '../services/api'
import { getDuracao } from './Producao'
import '../styles/Consultas.css'

export default function Consultas() {
    const [queries, setQueries] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingQuery, setLoadingQuery] = useState(false)
    const [queryRows, setQueryRows] = useState([])
    const [sqlQuery, setSqlQuery] = useState("")
    const [sqlColumns, setSqlColumns] = useState([])
    const [currentQueryId, setCurrentQueryId] = useState(0)
    const [host] = useGlobal('host')
    const [port] = useGlobal('port')
    const [database] = useGlobal('database')
    const [user] = useGlobal('user')
    const [password] = useGlobal('password')
    useEffect(() => {
        async function loadScripts() {
            setLoading(true);
            const { data } = await api.post('/scripts');
            setQueries(data);
            setLoading(false)
        }
        loadScripts();
    }, [])
    async function handleClick(element, queryId) {
        if (element !== "li") return;
        setLoadingQuery(true);
        const credentials = { host, port, database, user, password }
        const { data } = await api.post(`/scripts/${queryId}`, credentials)
        setQueryRows(data.rows.map(row => {
            if (row.datalancamento) {
                row.datalancamento = new Date(Date.parse(row.datalancamento)).toLocaleDateString()
            }
            if (row.orcamento) {
                row.orcamento = `R$ ${(row.orcamento).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
            }
            if (row.duracao) {
                row.duracao = getDuracao(row.duracao)
            }
            return row;
        }))
        setSqlQuery(data.sql)
        //extrai colunas
        setSqlColumns(data.rows.length > 0 ? Object.keys(data.rows[0]) : [])
        setCurrentQueryId(data.id)
        setLoadingQuery(false);
    }
    return (
        <div className="panel-container">
            {loading
                ? <div className="loader" />
                : <div className="content-container">
                    <ul className="query-ul">
                        {queries.map(query =>
                            <li key={query.id} style={
                                currentQueryId === query.id ? {
                                    background: "#F35A5A",
                                    color: "white"
                                } : {
                                        background: "white",
                                        color: "#F35A5A"
                                    }
                            } className="query-li" onClick={(event) => handleClick(event.target.localName, query.id)}>{query.question}
                                {currentQueryId === query.id ? <div><span>{sqlQuery}</span></div> : ""}
                            </li>
                        )}
                    </ul>
                    <div className="query-container">
                        <span>Registros</span>
                        <div className="registers-container">
                            {
                                loadingQuery
                                    ? <div className="loader" />
                                    : <table>
                                        <thead>
                                            <tr>
                                                {sqlColumns.map(column => <th key={column}>{column}</th>)}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {queryRows.map((row, index) => <tr key={index}>
                                                {Object.values(row).map((value, index) => <td key={index}>{value}</td>)}
                                            </tr>)}
                                        </tbody>
                                    </table>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}