import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from '../components/header'
import React from 'react'
import ReactDOM from 'react-dom'

const App = () => (
    <Router>
        <Header />

        <Switch>
            <Route path="/dashboard">
                <h1>Dashboard</h1>
            </Route>
            <Route path="/games">
                <h1>Games</h1>
            </Route>
            <Route path="/plays">
                <h1>Plays</h1>
            </Route>
            <Route path="/">
                <h1>Home</h1>
            </Route>
        </Switch>
    </Router>
)

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <App />,
        document.body.appendChild(document.createElement('div'))
    )
})