
import { Link } from 'react-router-dom'
import Grid from '../grid'

import React from 'react'

import { connect } from 'react-redux'
import { loadGamesFailure, loadGamesSuccess, loadAllGames } from '../../../redux/actionCreators'


class GameList extends React.Component {
    componentWillMount() {
        console.log(this.props)
    }

    componentDidMount() {
        this.props.loadAllGames()
    }

    render = () => (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>grid</th>
                    <th># of times played</th>
                    <th># of Players</th>
                    <th>To Score</th>
                    <th>Difficulty Level</th>
                    <th>Actions</th>
                </tr>

            </thead>
            <tbody>
                {
                    this.props.games.games && this.props.games.games.map(game => (
                        <tr key={`game-${game.id}`}>
                            <td>{game.id}</td>
                            <td><Grid game={game} /></td>
                            <td>{game.noOfTimesPlayed}</td>
                            <td>{game.noOfPlayers}</td>
                            <td>{game.topScore}</td>
                            <td>{game.difficultyLevel}</td>
                            <td><Link to={`/games/${game.id}`}>View</Link></td>
                            <td><Link to={`/plays/new/${game.id}`}>Play</Link></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

const mapState = (state) => (
    { games: state.games }
)

export default connect(mapState,
    { loadGamesSuccess, loadGamesFailure, loadAllGames }
)(GameList);
