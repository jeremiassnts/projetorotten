import React from 'react'
import { useGlobal } from 'reactn'
import trash from '../assets/trash.svg'
import edit from '../assets/edit.svg'
import plus from '../assets/plus.svg'
import '../styles/List.css'
import api from '../services/api';

export default function List(props) {
    const { history, elements, arg1, arg2 = null, path, height = 100, options = false, setLoading = null } = props;
    const [host] = useGlobal('host')
    const [port] = useGlobal('port')
    const [database] = useGlobal('database')
    const [user] = useGlobal('user')
    const [password] = useGlobal('password')
    async function handleClick(ev, elementId) {
        if (ev.target.localName === 'img' || ev.target.className === 'new') {
            switch (ev.target.title) {
                case 'Excluir':
                    if (window.confirm('Tem certeza que deseja excluir a produção?')) {
                        setLoading(true);
                        const credentials = { host, port, database, user, password }
                        await api.delete(`/producoes/${elementId}`, { data: credentials })
                        history.push('/producoes')
                    }
                    break;
                case 'Editar':
                    history.push(`/edit/${elementId}`)
                    break;
                default:
                    console.log('novo')
                    break;
            }
        } else {
            history.push(`/${path}/${elementId}`)
        }
    }
    return (
        <div className="elements-container" style={{ height: `${height}vh` }}>
            {elements.map(element =>
                <div className="element-container" key={element.id} onClick={(ev) => { handleClick(ev, element.id) }}>
                    {options ? <div className="options">
                        <img src={edit} alt="edit" title="Editar" />
                        <img src={trash} alt="trash" title="Excluir" />
                    </div> : ""}
                    <footer>
                        <span>{element[arg1]}</span>
                        <span>{arg2 ? element[arg2] : ""}</span>
                    </footer>
                </div>
            )}
            {options
                ? <div title="Novo" className="new" onClick={(ev) => { handleClick(ev) }}><img src={plus} alt="new" title="Novo" /></div>
                : ""
            }
        </div>
    )
}
