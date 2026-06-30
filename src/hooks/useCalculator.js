import { useReducer, useEffect } from 'react';
import { calculate } from '../utils/calculatorLogic';

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
  SET_STATE: 'set-state', // Para hidratar desde LocalStorage
};

/**
 * Reductor que gestiona las transiciones de estado de la calculadora.
 * @param {Object} state - Estado actual de la calculadora.
 * @param {Object} action - Acción enviada al reductor.
 * @param {string} action.type - Tipo de acción.
 * @param {Object} [action.payload] - Datos adjuntos a la acción.
 * @returns {Object} Nuevo estado de la calculadora.
 */
const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.currentValue === 'Error') {
        return {
          ...state,
          currentValue: payload.digit,
        };
      }
      
      if (state.overwrite) {
        return {
          ...state,
          currentValue: payload.digit,
          overwrite: false,
        };
      }
      
      if (payload.digit === '0' && state.currentValue === '0') {
        return state;
      }
      
      if (payload.digit === '.' && state.currentValue?.includes('.')) {
        return state;
      }
      
      return {
        ...state,
        currentValue: `${state.currentValue || ''}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentValue == null && state.previousValue == null) {
        return state;
      }
      
      if (state.currentValue === 'Error') {
        return state;
      }

      if (state.currentValue == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousValue == null) {
        return {
          ...state,
          operation: payload.operation,
          previousValue: state.currentValue,
          currentValue: null,
        };
      }

      const computation = calculate(state.previousValue, state.currentValue, state.operation);
      if (computation === 'Error') {
        return {
          ...state,
          previousValue: null,
          operation: null,
          currentValue: 'Error',
          overwrite: true,
        };
      }

      return {
        ...state,
        previousValue: computation,
        operation: payload.operation,
        currentValue: null,
      };

    case ACTIONS.CLEAR:
      return {
        currentValue: null,
        previousValue: null,
        operation: null,
        overwrite: false,
        history: [],
      };

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentValue: null,
        };
      }
      if (state.currentValue == null) return state;
      if (state.currentValue === 'Error') {
        return {
          ...state,
          currentValue: null,
        };
      }
      if (state.currentValue.length === 1) {
        return { ...state, currentValue: null };
      }

      return {
        ...state,
        currentValue: state.currentValue.slice(0, -1),
      };

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentValue == null ||
        state.previousValue == null
      ) {
        return state;
      }

      const result = calculate(state.previousValue, state.currentValue, state.operation);
      
      const equation = `${state.previousValue} ${state.operation} ${state.currentValue} =`;
      const newHistory = [...(state.history || [])];
      if (result !== 'Error') {
        newHistory.push({ equation, result });
        if (newHistory.length > 5) {
          newHistory.shift();
        }
      }

      return {
        ...state,
        overwrite: true,
        previousValue: null,
        operation: null,
        currentValue: result,
        history: newHistory,
      };

    case ACTIONS.TOGGLE_SIGN:
      if (state.currentValue == null || state.currentValue === 'Error') {
        return state;
      }
      
      const toggled = (parseFloat(state.currentValue) * -1).toString();
      return {
        ...state,
        currentValue: toggled,
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
  currentValue: null,
  previousValue: null,
  operation: null,
  overwrite: false,
  history: [],
};

/**
 * Hook personalizado para manejar el estado de la calculadora.
 * Implementa persistencia automática del estado y del historial en LocalStorage.
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
