import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Grid from '../grid'
import { render } from 'react-dom';


class GameList extends React.Component {
    state = {games: []};

    componentDidMount() {
        fetch('/api/v1/games').then(resp => resp.json()).then(resp => {
            console.log("Data Loaded: ", resp)
            this.setState({games: resp.data})
        })
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
                    this.state.games && this.state.games.map(game => (
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

export default GameList;