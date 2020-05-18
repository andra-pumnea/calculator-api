import {peek} from '../evaluate';
import {isNumber} from '../evaluate';
import {splitTokens} from '../evaluate';
import {convertOperator} from '../evaluate';
import {getPrecedence} from '../evaluate';

describe("Helper functions", () => {
    test('should return a string which is the latest item added to the stack', () => {
        const stack: string[] = [];
        stack.push('A')
        stack.push('B')
        stack.push('C')
        expect(peek(stack)).toEqual('C')
    
    })

    test('should return mathematical tokens from expression', () => {
        const tokens = splitTokens('2+33');
        expect(tokens[0]).toEqual('2');
        expect(tokens[1]).toEqual('+');
        expect(tokens[2]).toEqual('33');
    })

    test('should return True if string is numeric, false otherwise', () => {
        expect(isNumber('(')).toBe(false);
        expect(isNumber('2+2')).toBe(false);
        expect(isNumber('1')).toBe(true);
        expect(isNumber('1234')).toBe(true);
    })

    test('should return correct CalculatorOperator', () => {
        const sumOp = convertOperator('+');
        const prodOp = convertOperator('*');
        const powerOp = convertOperator('^');

        expect(sumOp.name).toEqual('+');
        expect(sumOp.precedence).toEqual(0);

        expect(prodOp.name).toEqual('*');
        expect(prodOp.precedence).toEqual(1);

        expect(powerOp.name).toEqual('');
        expect(powerOp.precedence).toEqual(-1);
    })

    test('should return true if op1 has precedence, false otherwise', () => {
        const sum = convertOperator('+')
        const prod = convertOperator('*')
        const sub = convertOperator('-')
        expect(getPrecedence(sum, prod)).toBe(false);
        expect(getPrecedence(prod, sum)).toBe(true);
        expect(getPrecedence(sub, sum)).toBe(false);
    })
})

