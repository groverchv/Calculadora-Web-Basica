/**
 * Suma dos números.
 * @param {number} a - Primer sumando.
 * @param {number} b - Segundo sumando.
 * @returns {number} El resultado de la suma.
 */
export const add = (a, b) => a + b;

/**
 * Resta dos números.
 * @param {number} a - Minuendo.
 * @param {number} b - Sustraendo.
 * @returns {number} El resultado de la resta.
 */
export const subtract = (a, b) => a - b;

/**
 * Multiplica dos números.
 * @param {number} a - Primer factor.
 * @param {number} b - Segundo factor.
 * @returns {number} El resultado de la multiplicación.
 */
export const multiply = (a, b) => a * b;

/**
 * Divide dos números y controla la división por cero.
 * @param {number} a - Dividendo.
 * @param {number} b - Divisor.
 * @returns {number|string} El resultado de la división o 'Error' si se intenta dividir por cero.
 */
export const divide = (a, b) => {
  if (b === 0) return 'Error';
  return a / b;
};

/**
 * Obtiene el residuo de una división (módulo) y controla el caso del divisor cero.
 * @param {number} a - Dividendo.
 * @param {number} b - Divisor.
 * @returns {number|string} El resultado del módulo o 'Error' si se intenta hacer módulo por cero.
 */
export const modulo = (a, b) => {
  if (b === 0) return 'Error';
  return a % b;
};

/**
 * Realiza el cálculo matemático basado en los operandos y el operador seleccionado.
 * Valida que los operandos sean válidos y limita la precisión para evitar problemas de coma flotante.
 * No utiliza eval().
 * 
 * @param {string} previous - Primer operando (debe ser convertible a número).
 * @param {string} current - Segundo operando (debe ser convertible a número).
 * @param {string} operation - Operador matemático (+, -, ×, *, ÷, /, %).
 * @returns {string} El resultado del cálculo formateado como string, o 'Error'.
 */
export const calculate = (previous, current, operation) => {
  const prev = parseFloat(previous);
  const curr = parseFloat(current);
  if (isNaN(prev) || isNaN(curr)) return '';
  
  let result;
  switch (operation) {
    case '+':
      result = add(prev, curr);
      break;
    case '-':
      result = subtract(prev, curr);
      break;
    case '×':
    case '*':
      result = multiply(prev, curr);
      break;
    case '÷':
    case '/':
      result = divide(prev, curr);
      break;
    case '%':
      result = modulo(prev, curr);
      break;
    default:
      return '';
  }
  
  if (result === 'Error') return 'Error';
  
  // Control de precisión decimal de coma flotante (ej. 0.1 + 0.2)
  return parseFloat(result.toFixed(10)).toString();
};
