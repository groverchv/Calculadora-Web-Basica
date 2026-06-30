import React from 'react';
import Calculator from './components/Calculator';

/**
 * Componente raíz de la aplicación que organiza el layout central.
 */
function App() {
  return (
    <div className="app-container">
      <Calculator />
    </div>
  );
}

export default App;
