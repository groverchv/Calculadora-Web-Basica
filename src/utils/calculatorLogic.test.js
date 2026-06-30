import { describe, it, expect } from 'vitest';
import { evaluateExpression, tokenize } from './calculatorLogic';

describe('Tokenizador tokenize()', () => {
  it('debe separar números y operadores básicos', () => {
    const tokens = tokenize('6 × 5');
    expect(tokens).toEqual([
      { type: 'NUMBER', value: 6 },
      { type: 'OPERATOR', value: '*' },
      { type: 'NUMBER', value: 5 }
    ]);
  });

  it('debe manejar números negativos y positivos al inicio', () => {
    expect(tokenize('-6')).toEqual([
      { type: 'NUMBER', value: -6 }
    ]);
    expect(tokenize('+5')).toEqual([
      { type: 'NUMBER', value: 5 }
    ]);
  });

  it('debe manejar signos unitarios después de operadores', () => {
    expect(tokenize('6 * -5')).toEqual([
      { type: 'NUMBER', value: 6 },
      { type: 'OPERATOR', value: '*' },
      { type: 'NUMBER', value: -5 }
    ]);
  });
});

describe('Evaluador de Expresión evaluateExpression()', () => {
  it('debe evaluar operaciones básicas', () => {
    expect(evaluateExpression('5 + 3')).toBe('8');
    expect(evaluateExpression('10 - 4')).toBe('6');
    expect(evaluateExpression('6 × 5')).toBe('30');
    expect(evaluateExpression('8 ÷ 2')).toBe('4');
  });

  it('debe respetar la jerarquía de operadores (multiplicación antes de suma)', () => {
    expect(evaluateExpression('2 + 3 × 4')).toBe('14');
    expect(evaluateExpression('10 - 6 ÷ 2')).toBe('7');
  });

  it('debe evaluar expresiones con números negativos libres', () => {
    expect(evaluateExpression('-6')).toBe('-6');
    expect(evaluateExpression('+5')).toBe('5');
    expect(evaluateExpression('6 × -5')).toBe('-30');
    expect(evaluateExpression('6 × -')).toBe('Error');
  });

  it('debe manejar divisiones y módulos entre cero devolviendo "Error"', () => {
    expect(evaluateExpression('5 ÷ 0')).toBe('Error');
    expect(evaluateExpression('5 % 0')).toBe('Error');
  });

  it('debe evitar errores de precisión de punto flotante', () => {
    expect(evaluateExpression('0.1 + 0.2')).toBe('0.3');
    expect(evaluateExpression('0.1 × 0.2')).toBe('0.02');
  });

  it('debe retornar "Error" ante sintaxis incorrecta o incompleta', () => {
    expect(evaluateExpression('6 ×')).toBe('Error');
    expect(evaluateExpression('5 + 3 +')).toBe('Error');
    expect(evaluateExpression('abc + 5')).toBe('Error');
  });
});
