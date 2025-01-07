import { useState, useEffect } from 'react';

export function AlertMessage({ alertMessage, type = 'primary' }: { alertMessage: string, type?: string }) {  
  const [show, setShow] = useState(alertMessage.length > 0);
  useEffect(() => {
    setShow(alertMessage.length > 0);
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [alertMessage]);
  return (
    show && <div className={"alert mt-2 alert-" + type} role="alert">{alertMessage}</div>
  );
}
