import { useRef } from "react";
import Button from "./button";

export default function InputForm({ active, submitHandler }) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form className="input-container my-2" onSubmit={(e) => {
      e.preventDefault()
      submitHandler(inputRef.current?.value || '')
      inputRef.current!.value = ''
    }}>
      <input type="text" className="form-control my-2" readOnly={!active} ref={inputRef} />
      <Button disabled={!active}>Submit</Button>
    </form>
  )
}
