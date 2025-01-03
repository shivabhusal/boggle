export default function ScoreBoard({ words, score }: { words: string[], score: number }) {
  return (
    <div className="word-list col-md-3">
      <h2>Score: {score}</h2>
      <ul className="list-group">
        {words.map((w, i) =>
          <li className="list-group-item d-flex justify-content-between align-items-center" key={`word-${i}`}>
            {w}
            <span className="badge text-bg-primary rounded-pill">{w.length}</span>
          </li>
        )}
      </ul>
    </div>
  )
}