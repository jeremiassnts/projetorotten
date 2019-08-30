import React, { useState, useEffect } from 'react'
import { InsideRoutes } from '../routes';
import carrot from '../assets/carrot.svg'
import postgresql from '../assets/postgresql.svg'
import movie from '../assets/movie.svg'
import person from '../assets/person.svg'
import industry from '../assets/industry.svg'
import '../styles/Main.css'

export default function Main(props) {
    const { history } = props;
    const { state: credentials } = props.location;
    const [activeButton, setActiveButton] = useState('')
    async function handleClick(e) {
        const title = e.target.title;
        history.push(`/main/${title}`, credentials)
    }
    useEffect(() => {
        setActiveButton(history.location.pathname)
    },[history.location.pathname])
    return (
        <div className="main-container">
            <div className="menu-container">
                <div className="title" title="" onClick={handleClick}>
                    <img src={carrot} alt="Carrot" />
                    <span>Projeto Rotten</span>
                </div>
                <ul>
                    <li>
                        <button title="consultas" onClick={handleClick} className={activeButton.endsWith("consultas") ? "on" : "off"}>
                            <img src={postgresql} alt="PostgreSQL" />
                            Consultas
                            </button>
                    </li>
                    <li>
                        <button title="producoes" onClick={handleClick} className={activeButton.endsWith("producoes") ? "on" : "off"}>
                            <img src={movie} alt="Produção" />
                            Produções
                        </button>
                    </li>
                    <li>
                        <button title="artistas" onClick={handleClick} className={activeButton.endsWith("artistas") ? "on" : "off"}>
                            <img src={person} alt="Artista" />
                            Artistas
                        </button>
                    </li>
                    <li>
                        <button title="estudios" onClick={handleClick} className={activeButton.endsWith("estudios") ? "on" : "off"}>
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