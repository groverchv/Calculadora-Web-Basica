import React, { useState, useEffect } from 'react';
import { useCalculator, ACTIONS } from '../hooks/useCalculator';
import Display from './Display';
import Button from './Button';
import { Delete, Divide, Plus, Minus, X, Percent, Equal, History } from 'lucide-react';

/**
 * Componente principal de la Calculadora.
 * Conecta el hook de estado, la pantalla, el historial y la cuadrícula de botones.
 * Añade soporte para el teclado físico del usuario de forma accesible y fluida.
 */
const Calculator = () => {
  const [state, dispatch] = useCalculator();
  const [showHistory, setShowHistory] = useState(false);

  const { currentValue, previousValue, operation, history } = state;

  useEffect(() => {
    /**
     * Maneja las pulsaciones del teclado físico y las mapea a las acciones de la calculadora.
     * @param {KeyboardEvent} e - Evento de teclado de la ventana.
     */
    const handleKeyDown = (e) => {
      const { key } = e;
      
      // Impedir que el navegador haga scroll o acciones por defecto en Enter o Barra espaciadora
      if (key === 'Enter' || key === '=') {
        e.preventDefault();
        dispatch({ type: ACTIONS.EVALUATE });
      } else if (/[0-9]/.test(key)) {
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: key } });
      } else if (key === '.' || key === ',') {
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '.' } });
      } else if (key === '+') {
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: '+' } });
      } else if (key === '-') {
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: '-' } });
      } else if (key === '*' || key.toLowerCase() === 'x') {
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: '×' } });
      } else if (key === '/') {
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: '÷' } });
      } else if (key === '%') {
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: '%' } });
      } else if (key === 'Backspace') {
        dispatch({ type: ACTIONS.DELETE_DIGIT });
      } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        dispatch({ type: ACTIONS.CLEAR });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  return (
    <div className="calculator">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Calculadora SaaS</h2>
        <button 
          className="history-toggle" 
          onClick={() => setShowHistory(!showHistory)}
          title="Ver Historial"
        >
          <History size={16} />
          <span>Historial</span>
        </button>
      </div>

      {showHistory && (
        <div className="history-panel">
          {history && history.length > 0 ? (
            history.map((item, idx) => (
              <div key={idx} className="history-item">
                <span>{item.equation}</span>
                <strong style={{ color: 'var(--color-brand)' }}>{item.result}</strong>
              </div>
            ))
          ) : (
            <div style={{ padding: '8px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No hay operaciones registradas
            </div>
          )}
        </div>
      )}

      <Display 
        currentValue={currentValue} 
        previousValue={previousValue} 
        operation={operation} 
      />

      <div className="buttons-grid">
        {/* Fila 1 */}
        <Button className="btn-action" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>
          AC
        </Button>
        <Button className="btn-action" onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
          <Delete size={20} />
        </Button>
        <Button className="btn-action" onClick={() => dispatch({ type: ACTIONS.TOGGLE_SIGN })}>
          +/-
        </Button>
        <Button className="btn-op" onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: '%' } })}>
          <Percent size={20} />
        </Button>

        {/* Fila 2 */}
        <Button className="btn-num" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '7' } })}>
          7
        </Button>
        <Button className="btn-num" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '8' } })}>
          8
        </Button>
        <Button className="btn-num" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '9' } })}>
          9
        </Button>
        <Button className="btn-op" onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: '÷' } })}>
          <Divide size={20} />
        </Button>

        {/* Fila 3 */}
        <Button className="btn-num" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '4' } })}>
          4
        </Button>
        <Button className="btn-num" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '5' } })}>
          5
        </Button>
        <Button className="btn-num" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '6' } })}>
          6
        </Button>
        <Button className="btn-op" onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: '×' } })}>
          <X size={20} />
        </Button>

        {/* Fila 4 */}
        <Button className="btn-num" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '1' } })}>
          1
        </Button>
        <Button className="btn-num" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '2' } })}>
          2
        </Button>
        <Button className="btn-num" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '3' } })}>
          3
        </Button>
        <Button className="btn-op" onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: '-' } })}>
          <Minus size={20} />
        </Button>

        {/* Fila 5 */}
        <Button className="btn-num" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '0' } })}>
          0
        </Button>
        <Button className="btn-num" onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '.' } })}>
          .
        </Button>
        <Button className="btn-equals" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>
          <Equal size={20} />
        </Button>
        <Button className="btn-op" onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: '+' } })}>
          <Plus size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Calculator;
