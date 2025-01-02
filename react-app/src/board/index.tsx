import { useEffect, useState } from "react";
import Timer from "./timer";
const API_URL = 'http://localhost:3000/api/v1/boards';
export default function Board() {
  const boardLetters = [
    ['A', 'B', 'C', 'D'],
    ['A', 'B', 'C', 'D'],
    ['A', 'B', 'C', 'D'],
    ['A', 'B', 'C', 'D'],
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [boardId, setBoardId] = useState<number | null>(null);
  const [active, setActive] = useState(true);
  const [score, setScore] = useState(0);
  const [word, setWord] = useState('');
  const [words, setWords] = useState<string[]>([]);
  const [letters, setLetters] = useState<string[][]>(boardLetters);
  const submitWord = async () => {
    const response = await fetch(`${API_URL}/${boardId}/validate_word`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',  // Specify the content type as JSON
      },
      body: JSON.stringify({ board: { word } })
    })
    setIsLoading(false)
    console.log('status', response.ok)
    if (response.ok) {
      const newWords = [...new Set([...words, word])]
      setWords(newWords)
      setScore(newWords.reduce((sum, word) => sum + word.length, 0))
      setWord('')
    } else {
      alert('Invalid word')
    }
  }

  const whenTimerEnds = () => {
    alert('Timeup');
    setActive(false)
  }

  const fetchBoard = async () => {
    const response = await fetch('http://localhost:3000/api/v1/boards/', {
      method: 'post', headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json()
    setLetters(data.letters);
    setBoardId(data.id)
    // debugger;
  }

  useEffect(() => { fetchBoard(); }, [])


  return (
    <div className="board row">
      <div className="box-container col-md-6">
        <Timer callback={whenTimerEnds} />
        <div className="">
          {
            letters.map((row, i) => <Row row={row} key={`letter-${i}`} />)
          }
        </div>
        <form className="input-container" onSubmit={(e) => { e.preventDefault() }}>
          <input type="text" className="form-control" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWord(e.target.value)} value={word} readOnly={!active} />
          <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => submitWord()} disabled={isLoading} className="btn btn-primary mb-3">Submit</button>
        </form>
      </div>

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
    </div>
  )
}

type rowType = { row: string[] };
function Row({ row }: rowType) {
  return (
    <div>
      {
        row.map((l, i) => <Box letter={l} key={`box-${i}`} />)
      }
    </div>
  )
}

function Box({ letter }: { letter: string }) {
  return (<div className="b-box"><span>{letter}</span></div>)
}
