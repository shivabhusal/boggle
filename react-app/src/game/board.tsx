export default function BoggleBoard({ letters }: { letters: string[][] }) {

  return (<div className="box-container ">
    <div>
      {
        letters.map((row, i) => <Row row={row} key={`letter-${i}`} />)
      }
    </div>
  </div>)
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
