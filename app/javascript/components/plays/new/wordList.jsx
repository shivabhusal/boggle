import React from 'react'
export default ({ words: { invalid, valid } }) => (
  <ul className="list-group">
    <h2>Invalid Words</h2>
    {
      invalid.map((word, i) => <li key={word+i} className="list-group-item text-white bg-danger">{word}</li>)
    }
    <hr/>
    <h2>Valid Words</h2>
    {
      valid.map((word, i) => <li key={word+i} className="list-group-item text-white bg-success">{word}</li>)
    }
  </ul>
)
