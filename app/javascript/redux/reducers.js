import {LOAD_ALL_GAMES_SUCCESS, LOAD_ALL_GAMES_FAILURE} from './actionCreators'
import {LOAD_GAME_SUCCESS, LOAD_GAME_FAILURE} from './actionCreators'

const initState = {
    games: []
}

export const games = (state = initState, action)=>{
    switch(action.type){
        case LOAD_ALL_GAMES_SUCCESS:{
            return(
                {
                    ...state,
                    games: action.payload.games
                }
            )
        }

        default:{
            return(state)
        }
    }
}

export const game = (state = {game: {grid: []}}, action)=>{
    switch(action.type){
        case LOAD_GAME_SUCCESS:{
            return(
                {
                    ...state,
                    game: action.payload.game
                }
            )
        }

        default:{
            return(state)
        }
    }
}

export const play = (state = {game: {grid: []}}, action)=>{
    switch(action.type){
        case LOAD_GAME_SUCCESS:{
            return(
                {
                    ...state,
                    game: action.payload.game
                }
            )
        }

        default:{
            return(state)
        }
    }
}