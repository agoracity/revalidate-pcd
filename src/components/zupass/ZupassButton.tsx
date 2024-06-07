import React from 'react';
import { Button } from "@/components/ui/button";
import { useZupass } from './handleLogin';
import { useLoadingStore } from '@/store/store';

interface ZupassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  eventName: string;
  ticketId: string; // Add ticketId prop
}

const ZupassButton: React.FC<ZupassButtonProps> = ({ children, className = '', eventName, ticketId, ...props }) => {
  const { login } = useZupass();
  const validatedTickets = useLoadingStore((state) => state.validatedTickets);

  const loginHandler = async () => {
    await login(eventName, ticketId);
  };

  return (
    <Button onClick={loginHandler} className={`text-zupass-bg-dark-primary bg-zupass-accent-dark hover:bg-zupass-accent-darker rounded-full font-semibold py-3 px-6 ${className}`} {...props}>
      {validatedTickets[ticketId] ? 'Revalidate' : children}
    </Button>
  );
};

export default ZupassButton;
