import React from 'react';

/**
 * Componente de pantalla de la calculadora que muestra el valor actual y el operando anterior.
 * Implementa auto-ajuste de tamaño de fuente cuando el valor excede los 10 dígitos.
 * @param {object} props
 * @param {string|null} props.currentValue - Valor actual que se muestra principal.
 * @param {string|null} props.previousValue - Valor anterior de la operación.
 * @param {string|null} props.operation - Operador actual (+, -, ×, ÷, %).
 */
const Display = ({ currentValue, previousValue, operation }) => {
  // Ajustar el tamaño del texto dinámicamente según la longitud
  const getFontSize = (text) => {
    if (!text) return '2.5rem';
    const length = text.length;
    if (length > 16) return '1.25rem';
    if (length > 12) return '1.65rem';
    if (length > 10) return '2.0rem';
    return '2.5rem';
  };

  const formattedValue = currentValue || '0';

  return (
    <div className="display">
      <div className="display-previous">
        {previousValue} {operation}
      </div>
      <div 
        className="display-current" 
        style={{ fontSize: getFontSize(formattedValue) }}
      >
        {formattedValue}
      </div>
    </div>
  );
};

export default Display;
