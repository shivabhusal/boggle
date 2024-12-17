import { useEffect, useState } from "react";
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
    <div className="board">
      <Timer callback={whenTimerEnds} />
      {
        letters.map((row, i) => <Row row={row} key={`letter-${i}`} />)
      }
      <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWord(e.target.value)} value={word} readOnly={!active} />
      <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => submitWord()} disabled={isLoading}>Submit</button>
      <div className="word-list">
        {words.map((w, i) => <div key={`word-${i}`}> {w} </div>)}
      </div>
      <div>Score: {score}</div>

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

function Timer({ callback }: { callback: () => void }) {
  const [active, setActive] = useState(true)
  const [min, setMin] = useState(2)
  const [sec, setSec] = useState(0)
  const padding = (num) => num < 10 ? `0${num}` : num

  useEffect(() => {
    const handle = setInterval(() => {
      const totalSecond = min * 60 + sec - 1;
      const newSec = totalSecond % 60;
      const newMin = Math.floor(totalSecond / 60);

      setMin(newMin);
      setSec(newSec)

      if (totalSecond === 0) {
        setActive(false)
        callback()
      }
    }, 1000)

    if (!active) {
      clearInterval(handle)
    }
    return () => {
      clearInterval(handle)
    }
  }, [callback, min, sec, active])

  return (
    <div className="count-down-timer">
      <span>{padding(min)}</span> : <span>{padding(sec)}</span>
    </div>
  )
}

