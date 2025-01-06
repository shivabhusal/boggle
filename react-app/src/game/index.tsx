import { useEffect, useState } from "react";
import Timer from "./timer";
import ScoreBoard from "./scoreBoard";
import BoggleBoard from "./board";
import InputForm from "./form";

const API_URL = 'http://localhost:3000/api/v1/boards';
const TIMER_DURATION = 120;

export default function Board() {
  const [boardId, setBoardId] = useState<number | null>(null);
  const [active, setActive] = useState(true);
  const [score, setScore] = useState(0);
  const [words, setWords] = useState<string[]>([]);
  const [letters, setLetters] = useState<string[][]>([[]]);

  const submitWord = async (word) => {
    const response = await fetch(`${API_URL}/${boardId}/validate_word`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',  // Specify the content type as JSON
      },
      body: JSON.stringify({ board: { word } })
    })

    console.log('status', response.ok)
    if (response.ok) {
      const newWords = [...new Set([...words, word])]
      setWords(newWords)
      setScore(newWords.reduce((sum, word) => sum + word.length, 0))
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
  }

  useEffect(() => { fetchBoard(); }, [])
  console.log('letters', letters)

  return (
    <>
      <h2 className="text-center my-2">Score: {score}</h2>
      <div className="board row my-5">
        <div className="col-6">
          <BoggleBoard letters={letters} />
          <InputForm active={active} submitHandler={submitWord} />
        </div>
        <div className="col-6">
          <div className="d-flex justify-content-center my-3">
            <Timer callback={whenTimerEnds} seconds={TIMER_DURATION} />
          </div>
          <ScoreBoard words={words} />
        </div>
      </div>
    </>
  )
}
