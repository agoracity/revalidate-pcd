import React from 'react';
import { Button } from "@/components/ui/button";

interface ZupassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

const ZupassButton: React.FC<ZupassButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <Button className={`text-zupass-bg-dark-primary bg-zupass-accent-dark hover:bg-zupass-accent-darker rounded-full font-semibold py-3 px-6 ${className}`} {...props}>
      {children}
    </Button>
  );
};

export default ZupassButton;
