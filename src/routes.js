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
import Edit from './pages/Edit'
import Insert from './pages/Insert'

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
        <BrowserRouter basename="/main" forceRefresh={true}>
            <Route path='/' exact component={Informe} />
            <Route path="/consultas" component={Consultas} />
            <Route path="/producoes" exact component={Producoes} />
            <Route path="/producoes/:producaoId" component={Producao} />
            <Route path="/edit/:producaoId" component={Edit} />
            <Route path="/insert/:producaoId" component={Insert} />
            <Route path="/artistas" exact component={Artistas} />
            <Route path="/artistas/:artistaId" component={Artista} />
            <Route path="/estudios" exact component={Estudios} />
            <Route path="/estudios/:estudioId" component={Estudio} />
        </BrowserRouter>
    )
}