export default function ScoreBoard({ words }: { words: string[] }) {
  return (
    <div className="word-list">
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