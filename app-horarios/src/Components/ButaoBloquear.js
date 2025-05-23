import React, { useState } from 'react';

function BotaoBloquear() {
  const [isBlocked, setIsBlocked] = useState(false);

  const handleClick = () => {
    setIsBlocked(prev => !prev);
  };

  return (
    <div className="col-2 mt-3 pb-3">
      <button
        type="button"
        className={`btn btn-lg ${isBlocked ? 'btn-secondary' : 'btn-danger'}`}
        onClick={handleClick}
      >
        {isBlocked ? 'Desbloquear' : 'Bloquear'}
      </button>
    </div>
  );
}

export default BotaoBloquear;
