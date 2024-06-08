"use client"
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useZupass } from './handleLogin';
import usePCDStore from '@/store/store';

interface ZupassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  eventName: string;
  ticketId: string;
}

const ZupassButton: React.FC<ZupassButtonProps> = ({ children, className = '', eventName, ticketId, ...props }) => {
  const { login } = useZupass();
  const validatedTickets = usePCDStore((state) => state.validatedTickets);
  const isTicketValidated = validatedTickets[ticketId] || false; // Default to false if not found
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const loginHandler = async () => {
    await login(eventName, ticketId);
  };

  if (!isClient) {
    return (
      <Button className={`text-zupass-bg-dark-primary bg-zupass-accent-dark hover:bg-zupass-accent-darker rounded-full font-semibold py-3 px-6 ${className}`} {...props}>
        Loading...
      </Button>
    );
  }

  return (
    <Button onClick={loginHandler} className={`text-zupass-bg-dark-primary bg-zupass-accent-dark hover:bg-zupass-accent-darker rounded-full font-semibold py-3 px-6 ${className}`} {...props}>
      {isTicketValidated ? 'Revalidate' : children}
    </Button>
  );
};

export default ZupassButton;
