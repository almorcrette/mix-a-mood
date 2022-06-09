const ExpressionsLibraryModel = require('./ExpressionsLibraryModel')

describe('ExpressionsLibraryModel', () => {
  describe('.prototype', () => {
    describe('.isExpression', () => {
      describe('passes an emotion (string), returns true/false depending on match with expression', () => {
        it("returns 'true' if passed 'happy' and 'happy' is a expression", () => {
          const expressionsLibrary = new ExpressionsLibraryModel('happy');
          expect(expressionsLibrary.isExpression('happy')).toBe(true);
        })
        it("returns 'false' if passed 'happy' and 'happy' IS NOT a core expression", () => {
          const expressionsLibrary = new ExpressionsLibraryModel();
          expect(expressionsLibrary.isExpression('happy')).toBe(false);
        })
      })
    })
  
    describe('.selectRandomExpression', () => {
      describe('returns a expression from the expressions', () => {
        it("returns 'happy' sometimes if this is a expression", () => {
          const expressionsLibrary = new ExpressionsLibraryModel('happy');
          expect(expressionsLibrary.expressions).toContain(expressionsLibrary.selectRandomExpression());
        })
        it("returns 'sad' sometimes if this is a core expression", () => {
          const expressionsLibrary = new ExpressionsLibraryModel('sad');
          expect(expressionsLibrary.expressions).toContain(expressionsLibrary.selectRandomExpression());
        })
      })

    })
    describe('.matchToExpression', () => {
      describe('passes an array of words, returns first word matching an expression in the library', () => {
        it("returns 'happy' when passed ['happy'] if 'happy' is an expression", () => {
          const expressionsLibrary = new ExpressionsLibraryModel('happy');
          expect(expressionsLibrary.matchToExpression(['happy'])).toEqual('happy');
        })
        it("returns 'sad' when passed ['sad'] if 'sad' is an expression", () => {
          const expressionsLibrary = new ExpressionsLibraryModel('sad');
          expect(expressionsLibrary.matchToExpression(['sad'])).toEqual('sad');
        })
        it("returns 'sad' when passed ['depressed', 'sad'] if 'sad' is an expression but not 'depressed'", () => {
          const expressionsLibrary = new ExpressionsLibraryModel('sad');
          expect(expressionsLibrary.matchToExpression(['depressed', 'sad'])).toEqual('sad');
        })
      })
    })
  })
})