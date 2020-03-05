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
        words: {
            valid: ['ram'],
            invalid: ['mar']
        }
    }

    componentDidMount() {
        this.props.loadGame(this.props.match.params.gameId)
    }

    handleTimeup = () => {
        this.setState({ timeup: true })
    }

    handleNewWord = (word) => {
        this.setState({
            words: {
                ...this.state.words,
                valid: [...this.state.words.valid, word]
            }
        })
        console.log(word, ' is here')
    }

    render = () => (
        <>
            <div className="row">
                <div className="col-md-4">
                    <WordList words={this.state.words} />
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