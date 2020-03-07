import React from 'react'
import { connect } from 'react-redux'
import { loadGame } from '../../../redux/actionCreators'
import { withRouter } from 'react-router-dom'
import Grid from '../../games/grid'
import AddWord from './addWord'
import WordList from './wordList'
import Timer from './timer'

const initialState = {
    gameStarted: false,
    timeup: false,
    countDownStartTime: { min: 0, sec: 6 },
    score: 0,
    words: {
        valid: [],
        invalid: []
    }
};
class Play extends React.Component {
    state = initialState;


    componentDidMount() {
        this.props.loadGame(this.props.match.params.gameId)
    }


    handleStartGame = () => {
        this.setState({ ...initialState, gameStarted: true})
    }

    handleTimeup = () => {
        const id = this.props.match.params.gameId;
        this.calcScore()

        this.setState({ timeup: true, gameStarted: false }, () => {

            fetch(`/api/v1/games/${id}/plays`,
                {
                    // Without this, fetch wont send the JSON payload to the server
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'post',
                    body: JSON.stringify(this.state)
                }).then(() => {
                    console.log("The is successfully saved")
                })
        })
    }


    calcScore = () => {
        const score = this.state.words.valid.reduce((total, word) => (total + word.length), 0)
        this.setState({ score })
    }


    addToValid = (word) => {
        this.setState({
            words: {
                ...this.state.words,
                valid: [...this.state.words.valid, word]
            }
        })
    }

    addToInvalid = (word) => {
        this.setState({
            words: {
                ...this.state.words,
                invalid: [...this.state.words.invalid, word]
            }
        })
    }

    handleNewWord = (word) => {
        const id = this.props.match.params.gameId;
        if (this.state.words.valid.indexOf(word) != -1) {
            this.addToInvalid(word);
            return;
        }


        fetch(`/api/v1/games/${id}/check?word=${word}`)
            .then(resp => resp.json())
            .then(resp => {
                if (resp.valid === true) {
                    this.addToValid(word)
                } else {
                    this.addToInvalid(word)
                }
            })
    }

    showScore = () => {
        if (this.state.timeup) {
            return (
                <h2>Score: {this.state.score}</h2>
            )
        }
    }

    render = () => (
        <>
            <div className="row">
                <div className="col-md-4">
                    <WordList words={this.state.words} />
                    <hr />
                    {this.showScore()}
                </div>


                <div className="col-md-8 text-center">

                    <Timer
                        gameStarted={this.state.gameStarted}
                        startTime={this.state.countDownStartTime}
                        handleTimeup={this.handleTimeup}
                        timeup={this.state.timeup}
                    />

                    <Grid game={this.props.game} />
                    <br />

                    <AddWord gameStarted={this.state.gameStarted}
                        handleNewWord={this.handleNewWord}
                        timeup={this.state.timeup}
                    />

                    <hr />
                    {
                        !this.state.gameStarted ? <button className="btn btn-primary" onClick={this.handleStartGame}>Start Game</button> : ''
                    }

                </div>
            </div>
        </>
    )
}

const mapState = state => state.play;
export default withRouter(connect(mapState, { loadGame })(Play));