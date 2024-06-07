"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { useZupass } from './handleLogin';

interface ZupassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  eventName: string;
}

const ZupassButton: React.FC<ZupassButtonProps> = ({ children, className = '', eventName, ...props }) => {
  const { login } = useZupass();

  const loginHandler = async () => {
    await login(eventName);
  };

  return (
    <Button onClick={loginHandler} className={`text-zupass-bg-dark-primary bg-zupass-accent-dark hover:bg-zupass-accent-darker rounded-full font-semibold py-3 px-6 ${className}`} {...props}>
      {children}
    </Button>
  );
};

export default ZupassButton;
