import React, { useMemo } from 'react';

import { useAuthStore } from '../../store/useAuthStore';

import Spinner from '../Spinner/Spinner';

interface AsyncButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const AsyncButton: React.FC<AsyncButtonProps> = ({ children, className, ...props }) => {
  const { loading } = useAuthStore();

  const buttonContent = useMemo(() => {
    return loading ? <Spinner /> : children;
  }, [loading, children]);

  return (
    <button className={`${className} flex-center ${loading ? 'disabled' : ''}`} {...props}>
      {buttonContent}
    </button>
  );
};

export default AsyncButton;