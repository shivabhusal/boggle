import React from 'react'
import { useParams } from 'react-router-dom'
import GameIndex from '../index';
import Grid from '../grid'
import {getGame} from '../selectors'

const GameShow = () => {
    const { id } = useParams();
    const game = getGame(id);
    return (
        <>
            <h1>Game id:{game.id}</h1>
            <Grid />
            <br/>
            <br/>
            <table className="table">
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
            </table>
        </>
    )
}

export default GameShow;