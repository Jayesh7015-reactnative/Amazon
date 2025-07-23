import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

export const ToastProvider: React.FC = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      toastOptions={{
        duration: 4000,
        style: {
          background: '#fff',
          color: '#363636',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          maxWidth: '400px',
        },
      }}
    />
  );
};

interface ToastOptions {
  duration?: number;
}

export const showToast = {
  success: (message: string, options?: ToastOptions) => {
    toast.success(message, {
      icon: <CheckCircleIcon sx={{ color: '#10b981' }} />,
      ...options
    });
  },
  
  error: (message: string, options?: ToastOptions) => {
    toast.error(message, {
      icon: <ErrorIcon sx={{ color: '#ef4444' }} />,
      ...options
    });
  },
  
  info: (message: string, options?: ToastOptions) => {
    toast(message, {
      icon: <InfoIcon sx={{ color: '#3b82f6' }} />,
      ...options
    });
  },
  
  warning: (message: string, options?: ToastOptions) => {
    toast(message, {
      icon: <WarningIcon sx={{ color: '#f59e0b' }} />,
      ...options
    });
  },
  
  loading: (message: string, options?: ToastOptions) => {
    return toast.loading(message, options);
  },
  
  dismiss: (toastId?: string) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  }
};