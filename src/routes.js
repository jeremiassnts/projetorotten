import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './pages/Login'
import Main from './pages/Main'
import Informe from './pages/Informe'
import Producoes from './pages/Producoes'
import Consultas from './pages/Consultas'
import Artistas from './pages/Artistas'
import Estudios from './pages/Estudios'
import Artista from './pages/Artista'
import Producao from './pages/Producao'
import Estudio from './pages/Estudio'

export default function Routes() {
    return (
        <BrowserRouter forceRefresh={true}>
            <Route path='/' exact component={Login} />
            <Route path="/main" component={Main} />
        </BrowserRouter>
    )
}

export function InsideRoutes() {
    return (
        <BrowserRouter basename="/main">
            <Route path='/' exact component={Informe} />
            <Route path="/consultas" component={Consultas} />
            <Route path="/producoes" component={Producoes} />
            <Route path="/producoes/:producaoId" component={Producao} />
            <Route path="/artistas" component={Artistas} />
            <Route path="/artistas/:artistaId" component={Artista} />
            <Route path="/estudios" component={Estudios} />
            <Route path="/estudios/:estudioId" component={Estudio} />
        </BrowserRouter>
    )
}