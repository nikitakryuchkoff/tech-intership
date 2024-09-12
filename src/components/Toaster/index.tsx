import React from 'react';
import { useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

interface ToasterProps {
  show: boolean;
  message: string;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  delay?: number;
}

export default function Toaster({
  show,
  message,
  onClose,
  delay = 3000,
}: ToasterProps): JSX.Element {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose(false);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [show, delay, onClose]);

  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} onClose={() => onClose(false)} bg="dark">
        <Toast.Header closeButton>
          <strong className="me-auto">Уведомление</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
