import React from 'react'
import('./grid.scss')
const Grid = ({cells = new Array(16).fill('a')})=>(
    <div className="boggle-grid m-auto">
        {
            cells.map(char => <div>{char}</div>)
        }
    </div>
)

export default Grid