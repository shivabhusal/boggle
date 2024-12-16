import { useEffect, useState } from "react";

export default function Board() {

  const boardLetters = [
    ['A', 'B', 'C', 'D'],
    ['A', 'B', 'C', 'D'],
    ['A', 'B', 'C', 'D'],
    ['A', 'B', 'C', 'D'],
  ];

  const [boardId, setBoardId] = useState<number|null>(null);
  const [word, setWord] = useState('');
  const [words, setWords] = useState<string[]>([]);
  const [letters, setLetters] = useState<string[][]>(boardLetters);
  const submitWord = async () => {
    const response = await fetch(`http://localhost:3000/api/v1/boards/${boardId}/validate_word`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',  // Specify the content type as JSON
      },
      body: JSON.stringify({ board: {word}})
    })
    console.log('status', response.ok)
    if(response.ok){
      setWords([...words, word])
    }else{
      alert('Invalid word')
    }
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

  useEffect(() => {
    fetchBoard();
  }, [])


  return (
    <div className="board">

      {
        letters.map((row, i) => <Row row={row} key={i} />)
      }
      <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWord(e.target.value)} />
      <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => submitWord()}>Submit</button>
      <div className="word-list">
        {words.map((w, i) => <div key={i}>
          {w}
        </div>)}

      </div>
    </div>
  )
}

type rowType = { row: string[] };
function Row({ row }: rowType) {
  return (
    <div>
      {
        row.map((l, i) => <Box letter={l} key={i} />)
      }
    </div>
  )
}

function Box({ letter }: { letter: string }) {
  return (<div className="b-box"><span>{letter}</span></div>)
}


