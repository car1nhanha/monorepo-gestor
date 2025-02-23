import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  onClick?: () => void;
}

export function Card({ title, description, icon: Icon, iconColor = "text-blue-600", onClick }: CardProps) {
  const Component = onClick ? 'button' : 'div';
  
  return (
    <Component
      onClick={onClick}
      className={`p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-full text-left ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <Icon className={`w-12 h-12 ${iconColor} mb-4`} />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </Component>
  );
}