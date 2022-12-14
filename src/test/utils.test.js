import { lcm, type, checkArrContents, gcd } from '../shared/utils'
import { ValueError } from '../shared/errors'
import Fraction from '../models/fraction'

describe('Shared Utilities', function(){
    describe('private fxn gcd: greatest common divisor', function() {
        describe.each([
            [ [5, 9], 1 ],
            [ [4, 10], 2 ],
            [ [8, 12], 4 ],
            [ [7, 12], 1 ],
            [ [330, 75, 450, 225], 15 ],
            [ [12, 15, 75], 3 ],
            [ [1, 15], 1 ],
            [ [300, 30], 30 ],
            [ [2, 14, 34, 46], 2 ]
        ])('given two numbers', (arrNum, correctAns) => {
            it(`calculates the gcd of ${JSON.stringify(arrNum)} as ${correctAns}`, () => {
                let result = gcd(arrNum[0], arrNum[1])
                expect(result).toEqual(correctAns)
            })
        })
    })

    describe('lcm: least common multiple', function() {
        describe.each([
            [ [5, 9], 45 ],
            [ [4, 10], 20 ],
            [ [8, 12], 24 ],
            [ [7, 12], 84],
            [ [330, 75, 450, 225], 4950 ],
            [ [12, 15, 75], 300 ],
            [ [1, 15], 15 ],
            [ [300, 30], 300 ],
            [ [2, 15, 34, 45], 1530 ]
        ])('given an array of numbers', (arrNum, correctAns) => {
            it(`calculates the lcm of ${JSON.stringify(arrNum)} as ${correctAns}`, () => {
                let result = lcm(arrNum)
                expect(result).toEqual(correctAns)
            })
        })

        it('does not compute LCM when zero is included', function() {
            expect(() => lcm([5,34,17,0])).toThrow(ValueError)
        })
    })

    describe('type', function(){
        describe.each([
            [ new Fraction, 'Fraction' ],
            [ [4, 10], 'Array' ],
            [ 8, 'number' ],
            [ '[7, 12]', 'string'],
            [ NaN, 'NaN' ],
            [ null, 'null' ],
            [ ()=>{Function.prototype}, 'Function' ]
        ])('given a variable', (variable, correctType) => {
            it(`returns the correct type for ${correctType}`, () => {
                let result = type(variable)
                expect(result).toEqual(correctType)
            })
        })
    })

    describe('checkArrContents', function() {
        describe.each([
            [ [5, 9, 5], 'number' ],
            [ [new Fraction(0,3), new Fraction(4,5)], 'Fraction' ],
            [ ["hello", "world"], 'string' ],
            [ [[7, 12], [4, 0]], 'Array']
        ])('given an array', (arr, desiredType) => {
            it(`checks that the arr contains only items of type ${desiredType}`, () => {
                let result = checkArrContents(arr, desiredType)
                expect(result).toBeTruthy()
            })
        })

        it('fails if array has incongruous items', function() {
            expect( () => checkArrContents([ 1, 2, 4, "5", 6], 'number')).toThrow(TypeError)
            expect( () => checkArrContents([ new Fraction(1,2), new Fraction(1,3), undefined, new Fraction(1, 6)], 'Fraction')).toThrow(TypeError)
        })
    })
})
