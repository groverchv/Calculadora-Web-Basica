import React from 'react';

/**
 * Componente de botón reutilizable y estilizado.
 * @param {object} props
 * @param {string} props.className - Clases de CSS adicionales.
 * @param {function} props.onClick - Función manejadora de click.
 * @param {React.ReactNode} props.children - Elementos hijos (texto o iconos).
 */
const Button = ({ className = '', onClick, children }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
