import React from 'react';

/**
 * Componente de pantalla de la calculadora que muestra la expresión actual.
 * @param {object} props
 * @param {string|null} props.currentValue - Expresión o resultado actual en pantalla.
 */
const Display = ({ currentValue }) => {
  // Ajustar el tamaño del texto dinámicamente según la longitud
  const getFontSize = (text) => {
    if (!text) return '2.5rem';
    const length = text.length;
    if (length > 22) return '1.2rem';
    if (length > 16) return '1.5rem';
    if (length > 12) return '2.0rem';
    return '2.5rem';
  };

  const formattedValue = currentValue || '0';

  return (
    <div className="display">
      <div className="display-previous">
        <span>Fórmula</span>
      </div>
      <div 
        className="display-current" 
        style={{ fontSize: getFontSize(formattedValue) }}
      >
        <span>{formattedValue}</span>
      </div>
    </div>
  );
};

export default Display;
