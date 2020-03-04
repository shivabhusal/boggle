import React from 'react'
import Game from './game'
import { useParams } from 'react-router-dom'

const GameShow = () => {
    const { id } = useParams();
    console.log('id is', id)
    return (<Game id={id} />)
}


export default GameShow;
