import { useReducer, useEffect } from 'react';
import { evaluateExpression } from '../utils/calculatorLogic';

/**
 * Acciones soportadas por el reductor de la calculadora.
 * @type {Object}
 */
export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
  TOGGLE_SIGN: 'toggle-sign',
  SET_STATE: 'set-state',
};

/**
 * Reductor que gestiona las transiciones de estado de la calculadora de expresión libre.
 * @param {Object} state - Estado actual de la calculadora.
 * @param {Object} action - Acción enviada al reductor.
 * @param {string} action.type - Tipo de acción.
 * @param {Object} [action.payload] - Datos adjuntos a la acción.
 * @returns {Object} Nuevo estado de la calculadora.
 */
const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.currentValue === 'Error' || state.overwrite) {
        return {
          ...state,
          currentValue: payload.digit,
          overwrite: false,
        };
      }
      return {
        ...state,
        currentValue: `${state.currentValue || ''}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentValue === 'Error' || state.overwrite) {
        return {
          ...state,
          currentValue: payload.operation,
          overwrite: false,
        };
      }
      return {
        ...state,
        currentValue: `${state.currentValue || ''}${payload.operation}`,
      };

    case ACTIONS.CLEAR:
      return {
        currentValue: '',
        overwrite: false,
        history: [],
      };

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite || state.currentValue === 'Error') {
        return {
          ...state,
          overwrite: false,
          currentValue: '',
        };
      }
      if (!state.currentValue) return state;
      return {
        ...state,
        currentValue: state.currentValue.slice(0, -1),
      };

    case ACTIONS.EVALUATE:
      if (!state.currentValue) return state;
      
      const result = evaluateExpression(state.currentValue);
      if (result === '') return state;
      
      const newHistory = [...(state.history || [])];
      if (result !== 'Error') {
        newHistory.push({ equation: `${state.currentValue} =`, result });
        if (newHistory.length > 5) {
          newHistory.shift();
        }
      }

      return {
        ...state,
        overwrite: true,
        currentValue: result,
        history: newHistory,
      };

    case ACTIONS.TOGGLE_SIGN:
      if (!state.currentValue || state.currentValue === 'Error') {
        return {
          ...state,
          currentValue: '-',
        };
      }
      if (state.currentValue === '-') {
        return {
          ...state,
          currentValue: '',
        };
      }
      
      const parsedNum = Number(state.currentValue);
      if (!isNaN(parsedNum)) {
        return {
          ...state,
          currentValue: (parsedNum * -1).toString(),
        };
      }
      
      // Para expresiones complejas, añadir '-'
      return {
        ...state,
        currentValue: `${state.currentValue}-`,
      };

    case ACTIONS.SET_STATE:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};

/**
 * Estado inicial por defecto de la calculadora.
 * @type {Object}
 */
const initialState = {
  currentValue: '',
  overwrite: false,
  history: [],
};

/**
 * Hook personalizado para manejar el estado de la calculadora de forma libre.
 * Implementa persistencia automática en LocalStorage.
 * 
 * @returns {[Object, function]} El estado de la calculadora y la función dispatch.
 */
export const useCalculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    try {
      const persisted = localStorage.getItem('calculator_state');
      return persisted ? JSON.parse(persisted) : initial;
    } catch (e) {
      console.error('Error al inicializar LocalStorage', e);
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('calculator_state', JSON.stringify(state));
    } catch (e) {
      console.error('Error al persistir estado en LocalStorage', e);
    }
  }, [state]);

  return [state, dispatch];
};
