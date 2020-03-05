import React from 'react'
import Grid from '../grid'

import { connect } from 'react-redux'
import { loadGame } from '../../../redux/actionCreators'
import { Link } from 'react-router-dom';

class Game extends React.Component {


    componentDidMount() {
        this.props.loadGame(this.props.id);
    }

    render = () => {
        const game = this.props.game;

        return (
            <>

                <Grid game={game} />
                <br />
                <div className="text-center">
                    <Link className="btn btn-success" to={`/games/${game.id}/plays/new`}>Play this Game</Link>
                </div>
                <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th># of Timers Played</th>
                            <td>{game.noOfTimesPlayed}</td>
                        </tr>
                        <tr>
                            <th># of Players</th>
                            <td>{game.noOfPlayers}</td>
                        </tr>
                        <tr>
                            <th>Top Score</th>
                            <td>{game.topScore}</td>
                        </tr>
                        <tr>
                            <th>Difficulty Level</th>
                            <td>{game.difficultyLevel}</td>
                        </tr>
                    </thead>
                </table>
            </>
        )
    }
}

const mapState = (state) => ({ game: state.game })

export default connect(mapState, { loadGame })(Game);