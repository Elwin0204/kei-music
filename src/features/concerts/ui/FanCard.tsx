// src/features/concerts/ui/FanCard.tsx
import React from 'react';
import { cn } from '@/utils';

interface FanCardProps {
  name: string;
  checkIn: string;
  message: string;
  className?: string;
}

export const FanCard: React.FC<FanCardProps> = ({ 
  name, 
  checkIn, 
  message, 
  className 
}) => {
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-md p-4 mx-2 min-w-[300px]", 
      className
    )}>
      <h3 className="font-semibold text-lg mb-2">{name}</h3>
      <p className="text-gray-600 text-sm mb-2">{checkIn}</p>
      <p className="text-gray-800">{message}</p>
    </div>
  );
};