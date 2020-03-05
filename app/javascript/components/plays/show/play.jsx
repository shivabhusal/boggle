import React from 'react'
import { connect } from 'react-redux'
import {loadGame} from '../../../redux/actionCreators'
import { withRouter } from 'react-router-dom'

class Play extends React.Component {

    render = ()=>(
        <>
            <h1>Play Page {this.props.match.params.id}</h1>
        </>
    )
}

const mapState = state=>({play: state.game})
export default withRouter(connect(mapState, {loadGame})(Play));