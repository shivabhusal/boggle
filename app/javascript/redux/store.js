import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { games, game } from './reducers'
import thunk from 'redux-thunk'

export default createStore(
    combineReducers({ games, game }),
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)