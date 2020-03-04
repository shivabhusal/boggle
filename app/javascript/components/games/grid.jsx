import React from 'react'
import('./grid.scss')
const Grid = ({game })=>(
    <div className="boggle-grid m-auto">
        {
            game.grid.map((char, index) => <div key={`game-${game.id}-char-${index}`} >{char}</div>)
        }
    </div>
)

export default Grid