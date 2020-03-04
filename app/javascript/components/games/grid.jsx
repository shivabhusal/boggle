import React from 'react'
import('./grid.scss')
const Grid = ({game })=>(
    <div className="boggle-grid m-auto">
        {
            game.grid.map(char => <div>{char}</div>)
        }
    </div>
)

export default Grid