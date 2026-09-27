import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { incrementVisitorCount } from '../services/visitorService';

const VisitorCounter: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Increment on every page load
    incrementVisitorCount().then(setCount);
  }, []);

  return (
    <div className="flex items-center gap-2 text-gray-500 text-sm">
      <Users size={14} className="text-purple opacity-70" />
      <span>
        {count === null ? (
          <span className="animate-pulse">···</span>
        ) : (
          <>
            <span className="text-purple font-semibold">
              {count.toLocaleString()}
            </span>{' '}
            {count === 1 ? 'visitor' : 'visitors'}
          </>
        )}
      </span>
    </div>
  );
};

export default VisitorCounter;
