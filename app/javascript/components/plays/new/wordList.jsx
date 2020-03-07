import React from 'react'
export default ({ words: { invalid, valid } }) => (
  <ul className="list-group">
    <h2>Invalid Words</h2>
    {
      invalid.length ? invalid.map(
        (word, i) => (<li key={word + i} className="list-group-item text-white bg-danger">{word}</li>)
      ) : <li className="list-group-item">N/A</li>
    }
    <hr />
    <h2>Valid Words</h2>
    {
      valid.length ? valid.map(
        (word, i) => (<li key={word + i} className="list-group-item text-white bg-success">{word}</li>)
      ) : <li className="list-group-item">N/A</li>
    }
  </ul>
)
