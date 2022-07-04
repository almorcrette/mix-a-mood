const ExpressionsLibrary = require('./ExpressionsLibrary')

const mockHappyExpression = {};
mockHappyExpression.getName = jest.fn().mockReturnValue('happy');
mockHappyExpression.isSimilarTo = jest.fn().mockReturnValue(true)

const mockSadExpression = {};
mockSadExpression.getName = jest.fn().mockReturnValue('sad');
mockSadExpression.isSimilarTo = jest.fn().mockReturnValue(false)


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

    describe('.hasSimilarExpression', () => {
      it("returns true if any calls .isSimilarTo on expression in the library and return true", () => {
        const libraryWithSimilarToMatch = new ExpressionsLibrary(mockHappyExpression);
        const libraryWithNoSimilarToMatch = new ExpressionsLibrary(mockSadExpression);
        const libraryWithSimilarToMatchAndNonMatch = new ExpressionsLibrary(mockHappyExpression, mockSadExpression);
        expect(libraryWithSimilarToMatch.hasSimilarExpression('emotion')).toEqual(true)
        expect(libraryWithNoSimilarToMatch.hasSimilarExpression('emotion')).toEqual(false)
        expect(libraryWithSimilarToMatchAndNonMatch.hasSimilarExpression('emotion')).toEqual(true)
      })
    })

    describe('.retrieveExpression', () => {
      describe('returns the expression whose name matches the emotion passed as parameter', () => {
        it("returns 'happyExpression' if passed 'happy'", () => {
          const expressionsLibrary = new ExpressionsLibrary(mockHappyExpression);
          expect(expressionsLibrary.retrieveExpression('happy')).toEqual(mockHappyExpression);
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
          expect(expressionsLibrary.firstMatchToExpression(['happy'])).toEqual(mockHappyExpression);
        })
        it("returns 'sad' when passed ['sad'] if 'sad' is an expression", () => {
          const expressionsLibrary = new ExpressionsLibrary(mockSadExpression);
          expect(expressionsLibrary.firstMatchToExpression(['sad'])).toEqual(mockSadExpression);
        })
        it("returns 'sad' when passed ['depressed', 'sad'] if 'sad' is an expression but not 'depressed'", () => {
          const expressionsLibrary = new ExpressionsLibrary(mockSadExpression);
          expect(expressionsLibrary.firstMatchToExpression(['depressed', 'sad'])).toEqual(mockSadExpression);
        })
      })
    })
  })
})