import React from 'react';

// hits.sh auto-increments on every image load — no backend, no setup needed.
// Change the key below to match your actual Netlify domain.
const HITS_KEY = 'darshilnathwani.netlify.app';

const VisitorCounter: React.FC = () => {
  return (
    <div className="flex items-center gap-1 text-gray-500 text-sm">
      <span className="text-gray-500">Views:</span>
      <img
        src={`https://hits.sh/${HITS_KEY}.svg?style=flat&color=6d28d9&label=`}
        alt="Visitor count"
        className="h-5"
      />
    </div>
  );
};

export default VisitorCounter;
