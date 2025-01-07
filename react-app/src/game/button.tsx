export default function Button({ children, disabled, className, onClick }: { children: string, disabled?: boolean, className?: string, onClick?: () => void }) {
  return (
    <button disabled={disabled} className={`btn btn-primary mb-3 w-100 ${className}`} onClick={onClick}>{children}</button>
  )
}