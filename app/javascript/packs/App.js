import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from '../components/header'
import React from 'react'
import ReactDOM from 'react-dom'
import GameIndex from '../components/games/index'
import GameShow from '../components/games/show'
import { games } from '../components/games/selectors'

const App = () => (
    <Router>
        <Header />
        <div className="container">
            <Switch>
                <Route path="/dashboard">
                    <h1>Dashboard</h1>
                </Route>
                <Route path="/games/:id">
                    <h1>Game Show</h1>
                    <GameShow />
                </Route>
                <Route path="/games">
                    <h1>Games</h1>
                    <GameIndex games={games} />
                </Route>
                <Route path="/plays">
                    <h1>Plays</h1>
                </Route>
                <Route path="/">
                    <h1>Home</h1>
                </Route>
            </Switch>
        </div>
    </Router>
)

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <App />,
        document.body.appendChild(document.createElement('div'))
    )
})