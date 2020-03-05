import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom'
import Header from '../components/header'
import React from 'react'
import ReactDOM from 'react-dom'
import GameIndex from '../components/games/index'
import GameShow from '../components/games/show'
import { Provider } from 'react-redux'
import store from '../redux/store'
import PlayIndex from '../components/plays/index'
import PlayNew from '../components/plays/new'


const App = () => (
    <Router>
        <Header />
        <div className="container">
            <Switch>
                <Route path="/dashboard">
                    <h1>Dashboard</h1>
                </Route>

                <Route path="/games/:gameId/plays/new">
                    <h1>Play </h1>
                    <PlayNew />
                </Route>

                <Route path="/games/:id">
                    <h1>Game Show</h1>
                    <GameShow />
                </Route>

                <Route path="/games">
                    <h1>Games</h1>
                    <GameIndex />
                </Route>

                <Route path="/plays">
                    <h1>Plays</h1>
                    <PlayIndex />
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
        <Provider store={store}>
            <App />
        </Provider>,
        document.body.appendChild(document.createElement('div'))
    )
})