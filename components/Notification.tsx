'use client';
import React, { useEffect } from 'react';

interface NotificationProps {
  type: 'success' | 'error';
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function Notification({ type, message, isVisible, onClose }: NotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const styles = {
    success: {
      bg: 'bg-emerald-50/80',
      border: 'border-emerald-200',
      text: 'text-emerald-800',
      icon: '✓',
      iconBg: 'bg-emerald-600'
    },
    error: {
      bg: 'bg-red-50/80',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: '✕',
      iconBg: 'bg-red-600'
    }
  };

  const currentStyle = styles[type];

  return (
    <div className={`flex items-start gap-3 rounded-t-2xl border-b ${currentStyle.border} ${currentStyle.bg} px-4 py-3 text-sm ${currentStyle.text} transition-all duration-300 ease-in-out`}>
      <span className={`mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full ${currentStyle.iconBg} text-white`}>
        {currentStyle.icon}
      </span>
      <p className="leading-6">{message}</p>
    </div>
  );
}
