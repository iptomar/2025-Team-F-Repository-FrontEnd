import React, { useState } from 'react';

function BotaoGuardar({ isBlocked }) {
  const handleClick = () => {
    if (isBlocked) return;
    // Your save logic here
  };

  return (
    <div className="col-1 mt-3 pb-3">
      <button
        className="btn btn-lg btn-primary"
        onClick={handleClick}
        disabled={isBlocked}
      >
        Guardar
      </button>
    </div>
  );
}


export default BotaoGuardar;