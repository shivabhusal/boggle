import { useEffect, useState } from "react";
import Timer from "./timer";
import ScoreBoard from "./scoreBoard";
import BoggleBoard from "./board";
import InputForm from "./form";

const API_URL = 'http://localhost:3000/api/v1/boards';

export default function Board() {
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(false)
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


  return (
    <div className="board row my-5">
      <div className="col-md-6">
        <Timer callback={whenTimerEnds} />
        <BoggleBoard letters={letters} />
        <InputForm active={active} submitHandler={submitWord} />
      </div>
      <div className="col-md-6">

        <ScoreBoard words={words} score={score} />
      </div>
    </div>
  )
}
