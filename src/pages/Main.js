import React, { useState } from 'react'
import { InsideRoutes } from '../routes';
import carrot from '../assets/carrot.svg'
import postgresql from '../assets/postgresql.svg'
import movie from '../assets/movie.svg'
import person from '../assets/person.svg'
import industry from '../assets/industry.svg'
import '../styles/Main.css'

export default function Main(props) {
    const { history } = props;
    const [credentials] = useState(props.location.state)
    async function handleClick(e) {
        const title = e.target.title;
        history.push(`/main/${title}`, credentials)
    }
    return (
        <div className="main-container">
            <div className="menu-container">
                <div className="title" title="" onClick={handleClick}>
                    <img src={carrot} alt="Carrot" />
                    <span>Projeto Rotten</span>
                </div>
                <ul>
                    <li>
                        <button title="consultas" onClick={handleClick}>
                            <img src={postgresql} alt="PostgreSQL" />
                            Consultas
                            </button>
                    </li>
                    <li>
                        <button title="producoes" onClick={handleClick}>
                            <img src={movie} alt="Produção" />
                            Produções
                        </button>
                    </li>
                    <li>
                        <button title="artistas" onClick={handleClick}>
                            <img src={person} alt="Artista" />
                            Artistas
                        </button>
                    </li>
                    <li>
                        <button title="estudios" onClick={handleClick}>
                            <img src={industry} alt="Estúdio" />
                            Estúdios
                        </button>
                    </li>
                </ul>
            </div>
            <InsideRoutes />
        </div>
    )
}