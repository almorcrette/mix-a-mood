const ExpressionsLibrary = require('./ExpressionsLibrary')

const mockHappyExpression = {};
mockHappyExpression.getName = jest.fn().mockReturnValue('happy');

const mockSadExpression = {};
mockSadExpression.getName = jest.fn().mockReturnValue('sad');

describe('ExpressionsLibrary', () => {
  describe('.prototype', () => {
    describe('.isExpression', () => {
      describe('passes an emotion (string), returns true/false depending on match with expression', () => {
        it("returns 'true' if passed 'happy' and 'happy' is a expression", () => {
          const expressionsLibrary = new ExpressionsLibrary(mockHappyExpression);
          expect(expressionsLibrary.isExpression('happy')).toBe(true);
        })
        it("returns 'false' if passed 'happy' and 'happy' IS NOT a core expression", () => {
          const expressionsLibrary = new ExpressionsLibrary();
          expect(expressionsLibrary.isExpression('happy')).toBe(false);
        })
      })
    })
  
    describe('.selectRandomExpression', () => {
      describe('returns a expression from the expressions', () => {
        it("returns 'happy' sometimes if this is a expression", () => {
          const expressionsLibrary = new ExpressionsLibrary(mockHappyExpression);
          expect(expressionsLibrary.expressions).toContain(expressionsLibrary.selectRandomExpression());
        })
        it("returns 'sad' sometimes if this is a core expression", () => {
          const expressionsLibrary = new ExpressionsLibrary('sad');
          expect(expressionsLibrary.expressions).toContain(expressionsLibrary.selectRandomExpression());
        })
      })

    })
    describe('.firstMatchToExpression', () => {
      describe('passes an array of words, returns first word matching an expression in the library', () => {
        it("returns 'happy' when passed ['happy'] if 'happy' is an expression", () => {
          const expressionsLibrary = new ExpressionsLibrary(mockHappyExpression);
          expect(expressionsLibrary.firstMatchToExpression(['happy'])).toEqual('happy');
        })
        it("returns 'sad' when passed ['sad'] if 'sad' is an expression", () => {
          const expressionsLibrary = new ExpressionsLibrary(mockSadExpression);
          expect(expressionsLibrary.firstMatchToExpression(['sad'])).toEqual('sad');
        })
        it("returns 'sad' when passed ['depressed', 'sad'] if 'sad' is an expression but not 'depressed'", () => {
          const expressionsLibrary = new ExpressionsLibrary(mockSadExpression);
          expect(expressionsLibrary.firstMatchToExpression(['depressed', 'sad'])).toEqual('sad');
        })
      })
    })
  })
})