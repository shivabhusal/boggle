import { useState } from "react";
import Button from "./button";

export default function InputForm({ active, submitHandler }) {
  const [text, setText] = useState('');
  const hasContent = text.length > 2;
  return (
    <form className="input-container my-2" onSubmit={(e) => {
      e.preventDefault()
      submitHandler(text)
      setText('')
    }}>
      <input type="text" className="form-control my-2" value={text} readOnly={!active} onChange={(e) => setText(e.target.value)} />
      <Button disabled={!active || !hasContent}>Submit</Button>
    </form>
  )
}
