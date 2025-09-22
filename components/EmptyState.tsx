import React from 'react';
import { InboxIcon } from './Icons';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  message: string;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, message, action }) => {
  const defaultIcon = <InboxIcon className="w-16 h-16 text-tech-gray-300" />;
  return (
    <div className="text-center py-16 flex flex-col items-center bg-tech-gray-50 rounded-2xl my-4">
      <div className="mb-4">{icon || defaultIcon}</div>
      <h3 className="text-xl font-semibold text-tech-gray-800">{title}</h3>
      <p className="text-tech-gray-500 mt-2 max-w-sm">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};

export default EmptyState;