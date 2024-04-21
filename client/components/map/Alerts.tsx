import React from 'react';

function Alerts({ riddle }) {
  return (
    <div className="flex-1 p-5 border border-gray-300 rounded-l-lg text-white py-12 bg-stone-800/95">
        <h2 className="text-lg font-bold text-center">Riddle</h2>
        <p className="text-center text-sm mt-2">{riddle}</p>
    </div>
  );
}

export default Alerts;