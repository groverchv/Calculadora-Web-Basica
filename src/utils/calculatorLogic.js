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
 * Tokeniza una expresión matemática en números y operadores.
 * Soporta números negativos y positivos unitarios al inicio o después de un operador.
 * Normaliza los símbolos de multiplicación (×) y división (÷).
 * 
 * @param {string} str - La expresión a tokenizar.
 * @returns {Array<{type: string, value: any}>} Array de tokens.
 */
export const tokenize = (str) => {
  const normalized = str
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/\s+/g, ''); // Eliminar espacios
  
  const tokens = [];
  let i = 0;
  
  while (i < normalized.length) {
    const char = normalized[i];
    
    // Si es un operador binario estándar
    if (['*', '/', '%'].includes(char)) {
      tokens.push({ type: 'OPERATOR', value: char });
      i++;
      continue;
    }
    
    // Si es un signo + o - (puede ser unitario o binario)
    if (char === '+' || char === '-') {
      const prevToken = tokens[tokens.length - 1];
      // Es unitario si es el primer token o si el token anterior es un operador
      const isUnary = !prevToken || prevToken.type === 'OPERATOR';
      
      if (isUnary) {
        let numStr = char;
        i++;
        // Leer el resto del número
        while (i < normalized.length && /[0-9.]/.test(normalized[i])) {
          numStr += normalized[i];
          i++;
        }
        if (numStr === '+' || numStr === '-') {
          // Signo suelto sin número
          tokens.push({ type: 'NUMBER', value: NaN });
        } else {
          tokens.push({ type: 'NUMBER', value: parseFloat(numStr) });
        }
      } else {
        tokens.push({ type: 'OPERATOR', value: char });
        i++;
      }
      continue;
    }
    
    // Si es un dígito o punto decimal
    if (/[0-9.]/.test(char)) {
      let numStr = '';
      while (i < normalized.length && /[0-9.]/.test(normalized[i])) {
        numStr += normalized[i];
        i++;
      }
      tokens.push({ type: 'NUMBER', value: parseFloat(numStr) });
      continue;
    }
    
    // Cualquier otro carácter no permitido
    tokens.push({ type: 'INVALID', value: char });
    i++;
  }
  
  return tokens;
};

/**
 * Evalúa una expresión matemática completa ingresada de forma libre.
 * Implementa el algoritmo Shunting-Yard para respetar la precedencia de operadores (*, /, % antes de +, -).
 * Retorna 'Error' ante cualquier error matemático o sintáctico.
 * No utiliza eval().
 * 
 * @param {string} expression - La expresión matemática libre.
 * @returns {string} El resultado del cálculo o 'Error'.
 */
export const evaluateExpression = (expression) => {
  if (!expression || expression.trim() === '') return '';
  
  const tokens = tokenize(expression);
  
  // Validar si hay tokens inválidos o números mal estructurados (NaN)
  if (tokens.some(t => t.type === 'INVALID' || (t.type === 'NUMBER' && isNaN(t.value)))) {
    return 'Error';
  }
  
  // Si no hay tokens o el último es un operador, es una expresión incompleta o inválida
  if (tokens.length === 0 || tokens[tokens.length - 1].type === 'OPERATOR') {
    return 'Error';
  }
  
  const outputQueue = [];
  const operatorStack = [];
  const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '%': 2,
  };
  
  for (const token of tokens) {
    if (token.type === 'NUMBER') {
      outputQueue.push(token);
    } else if (token.type === 'OPERATOR') {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1].type === 'OPERATOR' &&
        precedence[operatorStack[operatorStack.length - 1].value] >= precedence[token.value]
      ) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.push(token);
    }
  }
  
  while (operatorStack.length > 0) {
    outputQueue.push(operatorStack.pop());
  }
  
  const stack = [];
  for (const token of outputQueue) {
    if (token.type === 'NUMBER') {
      stack.push(token.value);
    } else if (token.type === 'OPERATOR') {
      if (stack.length < 2) return 'Error';
      const b = stack.pop();
      const a = stack.pop();
      let res;
      switch (token.value) {
        case '+':
          res = add(a, b);
          break;
        case '-':
          res = subtract(a, b);
          break;
        case '*':
          res = multiply(a, b);
          break;
        case '/':
          res = divide(a, b);
          break;
        case '%':
          res = modulo(a, b);
          break;
        default:
          return 'Error';
      }
      
      if (res === 'Error') return 'Error';
      stack.push(res);
    }
  }
  
  if (stack.length !== 1) return 'Error';
  
  const finalResult = stack[0];
  if (isNaN(finalResult) || !isFinite(finalResult)) return 'Error';
  
  // Limitar precisión decimal para evitar problemas de coma flotante (ej. 0.1 + 0.2 = 0.3)
  return parseFloat(finalResult.toFixed(10)).toString();
};
