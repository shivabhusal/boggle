import React from 'react'
import { connect } from 'react-redux'
import { loadGame } from '../../../redux/actionCreators'
import { withRouter } from 'react-router-dom'
import Grid from '../../games/grid'
import AddWord from './addWord'
import WordList from './wordList'
import Timer from './timer'

class Play extends React.Component {
    state = {
        timeup: false,
        score: 0,
        words: {
            valid: ['ram'],
            invalid: ['mar']
        }
    }

    componentDidMount() {
        this.props.loadGame(this.props.match.params.gameId)
    }

    handleTimeup = () => {
        const id = this.props.match.params.gameId;
        this.setState({ timeup: true }, () => {
            fetch(`/api/v1/games/${id}/plays`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                      },
                    method: 'post',
                    body: JSON.stringify(this.state)
                }).then(() => {
                    console.log("Data saved.........")
                })
        })
    }

    handleNewWord = (word) => {
        const id = this.props.match.params.gameId;

        fetch(`/api/v1/games/${id}/check?word=${word}`)
            .then(resp => resp.json())
            .then(resp => {
                if (resp.valid === true) {
                    this.setState({
                        words: {
                            ...this.state.words,
                            valid: [...this.state.words.valid, word]
                        }
                    })
                } else {
                    this.setState({
                        words: {
                            ...this.state.words,
                            invalid: [...this.state.words.invalid, word]
                        }
                    })
                }
            })

        console.log(word, ' is here')
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

                <div className="col-md-8">
                    <Timer startTime={{ min: 0, sec: 4 }} handleTimeup={this.handleTimeup} />
                    <Grid game={this.props.game} />
                    <br />
                    <AddWord handleNewWord={this.handleNewWord} timeup={this.state.timeup} />
                </div>
            </div>
        </>
    )
}

const mapState = state => state.play;
export default withRouter(connect(mapState, { loadGame })(Play));