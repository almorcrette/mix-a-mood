const Library = require('./Library')

const mockHappyExpression = {};
mockHappyExpression.getName = jest.fn().mockReturnValue('happy');
mockHappyExpression.isSimilarTo = jest.fn().mockReturnValue(true)

const mockSadExpression = {};
mockSadExpression.getName = jest.fn().mockReturnValue('sad');
mockSadExpression.isSimilarTo = jest.fn().mockReturnValue(false)

const mockTiredExpression = {};
mockTiredExpression.getName = jest.fn().mockReturnValue('tired');
mockTiredExpression.isSimilarTo = jest.fn().mockReturnValue(true)


describe('Library', () => {
  describe('.prototype', () => {
    describe('.isExpression', () => {
      describe('passes an emotion (string), returns true/false depending on match with expression', () => {
        it("returns 'true' if passed 'happy' and 'happy' is a expression", () => {
          const library = new Library(mockHappyExpression);
          expect(library.isExpression('happy')).toBe(true);
        })
        it("returns 'false' if passed 'happy' and 'happy' IS NOT a core expression", () => {
          const library = new Library();
          expect(library.isExpression('happy')).toBe(false);
        })
      })
    })

    describe('.hasSimilarExpression', () => {
      it("returns true if any calls .isSimilarTo on expression in the library and return true", () => {
        const libraryWithSimilarToMatch = new Library(mockHappyExpression);
        const libraryWithNoSimilarToMatch = new Library(mockSadExpression);
        const libraryWithSimilarToMatchAndNonMatch = new Library(mockHappyExpression, mockSadExpression);
        expect(libraryWithSimilarToMatch.hasSimilarExpression('emotion')).toEqual(true)
        expect(libraryWithNoSimilarToMatch.hasSimilarExpression('emotion')).toEqual(false)
        expect(libraryWithSimilarToMatchAndNonMatch.hasSimilarExpression('emotion')).toEqual(true)
      })
    })

    describe('.retrieveExpression', () => {
      describe('returns the expression whose name matches the emotion passed as parameter', () => {
        it("returns 'happyExpression' if passed 'happy'", () => {
          const library = new Library(mockHappyExpression);
          expect(library.retrieveExpression('happy')).toEqual(mockHappyExpression);
        })
      })
    })

    describe('.retrieveSimilarExpression', () => {
      it('returns the first expression which has a similar word match to the word passed as argument', () => {
        const library = new Library(mockHappyExpression, mockSadExpression);
        expect(library.retrieveSimilarExpression('bright').getName()).toEqual('happy')
      })
    })
  
    describe('.selectRandomExpression', () => {
      describe('returns a expression from the expressions', () => {
        it("returns 'happy' sometimes if this is a expression", () => {
          const library = new Library(mockHappyExpression);
          expect(library.expressions).toContain(library.selectRandomExpression());
        })
        it("returns 'sad' sometimes if this is a core expression", () => {
          const library = new Library('sad');
          expect(library.expressions).toContain(library.selectRandomExpression());
        })
      })

    })
    describe('.firstMatchToExpression', () => {
      describe('passes an array of words, returns first word matching an expression in the library', () => {
        it("returns 'happy' when passed ['happy'] if 'happy' is an expression", () => {
          const library = new Library(mockHappyExpression);
          expect(library.firstMatchToExpression(['happy'])).toEqual(mockHappyExpression);
        })
        it("returns 'sad' when passed ['sad'] if 'sad' is an expression", () => {
          const library = new Library(mockSadExpression);
          expect(library.firstMatchToExpression(['sad'])).toEqual(mockSadExpression);
        })
        it("returns 'sad' when passed ['depressed', 'sad'] if 'sad' is an expression but not 'depressed'", () => {
          const library = new Library(mockSadExpression);
          expect(library.firstMatchToExpression(['depressed', 'sad'])).toEqual(mockSadExpression);
        })
      })
    })
  })
})