export const LOAD_ALL_GAMES_SUCCESS = 'LAGS';
export const LOAD_ALL_PLAYS_SUCCESS = 'LAPS';
export const LOAD_ALL_GAMES_FAILURE = 'LAGF';
export const LOAD_GAME_SUCCESS = 'LGS';
export const LOAD_GAME_FAILURE = 'LGF';

export const loadGamesFailure = error =>({
    type: LOAD_ALL_GAMES_FAILURE,
    payload: {error}
})

export const loadGamesSuccess = games =>({
    type: LOAD_ALL_GAMES_SUCCESS,
    payload: {games}
})

export const loadPlaysSuccess = plays =>({
    type: LOAD_ALL_PLAYS_SUCCESS,
    payload: {plays}
})

export const loadAllGames = ()=>(
    (dispatch)=>{
    console.log('Loading all data')

        fetch('/api/v1/games')
        .then(resp => resp.json())
        .then(resp => {
            dispatch(loadGamesSuccess(resp.data))
        }, err => {
            dispatch(loadGamesFailure(err))
        })
    }
)

export const loadAllPlays = ()=>(
    (dispatch)=>{
    console.log('Loading all play data')

        fetch('/api/v1/plays')
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp, "got data for plays")
            dispatch(loadPlaysSuccess(resp.data))
        }, err => {
            console.log(err, "did not get data for plays")
            dispatch(loadGamesFailure(err))
        })
    }
)

export const loadGameFailure = error =>({
    type: LOAD_GAME_FAILURE,
    payload: {error}
})

export const loadGameSuccess = game =>({
    type: LOAD_GAME_SUCCESS,
    payload: {game}
})

export const loadGame = (id)=>(
    (dispatch)=>{
    console.log('Loading the data')

        fetch('/api/v1/games/'+id)
        .then(resp => resp.json())
        .then(resp => {
            dispatch(loadGameSuccess(resp))
        }, err => {
            dispatch(loadGameFailure(err))
        })
    }
)

//------------------------------------

// export const ADD_WORD = 'addword';
// export const VERIFY_WORD = 'addword';
// export const ADD        w_WORD = 'addword';
// export const ADD_WORD = 'addword';
// export const ADD_WORD = 'addword';
// export const ADD_WORD = 'addword';