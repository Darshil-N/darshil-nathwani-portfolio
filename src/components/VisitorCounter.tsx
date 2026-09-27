import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { incrementVisitorCount, getVisitorCount } from '../services/visitorService';

const SESSION_KEY = 'visitor_counted';

const VisitorCounter: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem(SESSION_KEY);

    if (alreadyCounted) {
      // Don't increment again this session — just fetch current count
      getVisitorCount().then(setCount);
    } else {
      // First visit this session — increment
      incrementVisitorCount().then((newCount) => {
        setCount(newCount);
        sessionStorage.setItem(SESSION_KEY, 'true');
      });
    }
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
