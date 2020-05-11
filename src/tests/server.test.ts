import {peek} from '../evaluate';
import {isNumber} from '../evaluate';

test('should return a string which is the latest item added to the stack', () => {
    let stack = new Array<String>();
    stack.push('A')
    stack.push('B')
    stack.push('C')
    expect(peek(stack)).toEqual('C')

})

test('should return True is string is numeric, false otherwise', () => {
    expect(isNumber('(')).toBe(false);
    expect(isNumber('2+2')).toBe(false);
    expect(isNumber('1')).toBe(true);
    expect(isNumber('1234')).toBe(true);
})
