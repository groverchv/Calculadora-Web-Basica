import { describe, it, expect } from 'vitest';
import { calculate, add, subtract, multiply, divide, modulo } from './calculatorLogic';

describe('Operaciones Aritméticas Básicas Puras', () => {
  it('debe sumar dos números correctamente', () => {
    expect(add(5, 3)).toBe(8);
    expect(add(-5, 3)).toBe(-2);
  });

  it('debe restar dos números correctamente', () => {
    expect(subtract(5, 3)).toBe(2);
    expect(subtract(3, 5)).toBe(-2);
  });

  it('debe multiplicar dos números correctamente', () => {
    expect(multiply(5, 3)).toBe(15);
    expect(multiply(5, 0)).toBe(0);
  });

  it('debe dividir dos números correctamente', () => {
    expect(divide(6, 3)).toBe(2);
    expect(divide(5, 2)).toBe(2.5);
  });

  it('debe retornar "Error" al dividir por cero', () => {
    expect(divide(5, 0)).toBe('Error');
  });

  it('debe obtener el residuo (módulo) correctamente', () => {
    expect(modulo(5, 2)).toBe(1);
    expect(modulo(6, 0)).toBe('Error');
  });
});

describe('Función Controladora calculate()', () => {
  it('debe sumar valores tipo string correctamente', () => {
    expect(calculate('5', '3', '+')).toBe('8');
  });

  it('debe restar valores tipo string correctamente', () => {
    expect(calculate('5', '3', '-')).toBe('2');
  });

  it('debe multiplicar valores tipo string correctamente con multiplicador "*" y "×"', () => {
    expect(calculate('5', '3', '*')).toBe('15');
    expect(calculate('5', '3', '×')).toBe('15');
  });

  it('debe dividir valores tipo string correctamente con divisor "/" y "÷"', () => {
    expect(calculate('6', '3', '/')).toBe('2');
    expect(calculate('6', '3', '÷')).toBe('2');
  });

  it('debe realizar módulo correctamente', () => {
    expect(calculate('5', '2', '%')).toBe('1');
  });

  it('debe manejar división por cero devolviendo "Error"', () => {
    expect(calculate('5', '0', '/')).toBe('Error');
    expect(calculate('5', '0', '÷')).toBe('Error');
  });

  it('debe evitar problemas de precisión en coma flotante (ej. 0.1 + 0.2)', () => {
    expect(calculate('0.1', '0.2', '+')).toBe('0.3');
    expect(calculate('0.1', '0.7', '*')).toBe('0.07');
  });

  it('debe ignorar valores no numéricos devolviendo string vacío', () => {
    expect(calculate('abc', '3', '+')).toBe('');
    expect(calculate('5', 'xyz', '+')).toBe('');
  });

  it('debe retornar string vacío con operadores no soportados', () => {
    expect(calculate('5', '3', '^')).toBe('');
  });
});
