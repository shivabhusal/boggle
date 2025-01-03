import { useRef } from "react";

export default function InputForm({ active, submitHandler }) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form className="input-container" onSubmit={(e) => {
      e.preventDefault()
      submitHandler(inputRef.current?.value || '')
      inputRef.current!.value = ''
    }}>
      <input type="text" className="form-control" readOnly={!active} ref={inputRef} />
      <button disabled={!active} className="btn btn-primary mb-3">Submit</button>
    </form>
  )
}
