import { CSSProperties } from 'react';
export default function BoggleBoard({ letters }: { letters: string[][] }) {
  const boxContainerStyle: CSSProperties = {
    display: 'inline-block',
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid rgb(182, 185, 189)',
    background: 'linear-gradient(145deg,rgb(208, 201, 201), #d9d9d9)',
  }

  return (
    <div className="box-container" style={boxContainerStyle}>
      {
        letters.map((row, i) => <Row row={row} key={`letter-${i}`} />)
      }
    </div>
  )
}

type rowType = { row: string[] };
function Row({ row }: rowType) {
  return (
    <div style={{ width: '208px' }}>
      {
        row.map((l, i) => <Box letter={l} key={`box-${i}`} />)
      }
    </div>
  )
}


const boxStyle: CSSProperties = {
  width: '50px',
  height: '50px',
  display: 'inline-block',
  textAlign: 'center',
  lineHeight: '50px',
  border: '1px solid rgb(110, 114, 120)',
  borderRadius: '5px',
  margin: '1px'
}

function Box({ letter }: { letter: string }) {
  return (<div className="b-box" style={boxStyle}><span>{letter}</span></div>)
}
