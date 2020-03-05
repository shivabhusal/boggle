import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { games, game, play, plays } from './reducers'
import thunk from 'redux-thunk'

export default createStore(
    combineReducers({ games, game, play, plays }),
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)