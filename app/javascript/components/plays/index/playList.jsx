
import { Link } from 'react-router-dom'
import Grid from '../../games/grid'

import React from 'react'

import { connect } from 'react-redux'
import { loadAllPlays } from '../../../redux/actionCreators'


class PlayList extends React.Component {
    componentWillMount() {
        console.log(this.props)
    }

    componentDidMount() {
        this.props.loadAllPlays()
    }

    render = () => (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>grid</th>
                    <th># of Correct Words</th>
                    <th># of Incorrect Words</th>
                    <th>Score</th>
                    <th>Played at</th>

                </tr>

            </thead>
            <tbody>
                {
                    this.props.plays && this.props.plays.map(play => (
                        <tr key={`play-${play.id}`}>
                            <td>{play.id}</td>
                            <td>
                                <Link to={`/games/${play.gameId}`}>
                                    <Grid game={play} />
                                </Link>
                            </td>
                            <td>{play.noOfCorrectWords}</td>
                            <td>{play.noOfInCorrectWords}</td>
                            <td>{play.score}</td>
                            <td>{play.playedAt}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

const mapState = (state) => ({ plays: state.plays })

export default connect(mapState,
    { loadAllPlays }
)(PlayList);
