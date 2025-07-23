import React from 'react';
import { Toaster, toast } from 'react-hot-toast';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import './Toast.css';

interface ToastProviderProps {
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  reverseOrder?: boolean;
  toastOptions?: any;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  position = 'top-right',
  reverseOrder = false,
  toastOptions = {},
}) => {
  return (
    <Toaster
      position={position}
      reverseOrder={reverseOrder}
      toastOptions={{
        duration: 4000,
        style: {
          background: 'var(--color-background)',
          color: 'var(--color-text)',
          boxShadow: 'var(--shadow-md)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
          fontSize: '14px',
          maxWidth: '350px',
        },
        success: {
          iconTheme: {
            primary: 'var(--color-success)',
            secondary: 'white',
          },
        },
        error: {
          iconTheme: {
            primary: 'var(--color-error)',
            secondary: 'white',
          },
        },
        ...toastOptions,
      }}
    />
  );
};

// Custom toast functions
export const showToast = {
  success: (message: string) => {
    return toast.success(message, {
      icon: <CheckCircleIcon className="toast-icon success" />,
    });
  },
  error: (message: string) => {
    return toast.error(message, {
      icon: <ErrorIcon className="toast-icon error" />,
    });
  },
  info: (message: string) => {
    return toast.custom((t) => (
      <div className={`toast-custom info ${t.visible ? 'toast-enter' : 'toast-leave'}`}>
        <InfoIcon className="toast-icon info" />
        <span>{message}</span>
      </div>
    ));
  },
  warning: (message: string) => {
    return toast.custom((t) => (
      <div className={`toast-custom warning ${t.visible ? 'toast-enter' : 'toast-leave'}`}>
        <WarningIcon className="toast-icon warning" />
        <span>{message}</span>
      </div>
    ));
  },
  custom: (content: (t: any) => React.ReactElement) => {
    return toast.custom(content as any);
  },
  dismiss: (toastId?: string) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  },
};