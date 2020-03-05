import React from 'react'
import { connect } from 'react-redux'
import { loadGame } from '../../../redux/actionCreators'
import { withRouter } from 'react-router-dom'
import Grid from '../../games/grid'
import AddWord from './addWord'
import WordList from './wordList'
import Timer from './timer'
class Play extends React.Component {

    componentDidMount() {
        this.props.loadGame(this.props.match.params.gameId)
    }

    handleTimeup = ()=>{
        // alert('TIme UP')
    }

    handleNewWord = (word) =>{
        console.log(word, ' is here')
    }

    render = () => (
        <>
            <div className="row">
                <div className="col-md-4">
                    <WordList />
                </div>
                <div className="col-md-8">
                    <Timer startTime={{min: 0, sec: 4}} handleTimeup={this.handleTimeup}/>
                    <Grid game={this.props.game} />
                    <br />
                    <AddWord handleNewWord={this.handleNewWord}/>

                </div>
            </div>
        </>
    )
}

const mapState = state => state.play;
export default withRouter(connect(mapState, { loadGame })(Play));