const Library = require('./library')

const mockHappyExpression = {};
mockHappyExpression.getName = jest.fn().mockReturnValue('happy');
mockHappyExpression.isSimilarTo = jest.fn().mockReturnValue(true)
mockHappyExpression.addSimilarTo = jest.fn()

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
    describe('.makeImageSource', () => {
      describe("returns the url of the expression whose name is passed as argument", () => {
        it("returns 'static/images/happy.jpg' when 'happy' passed as parameter", () => {
          const library = new Library(mockHappyExpression);
          expect(library.makeImageSource('happy')).toEqual('static/images/happy.png')
        });
        it("returns 'static/images/sad.jpg' when 'sad' passed as parameter", () => {
          const library = new Library(mockSadExpression);
          expect(library.makeImageSource('sad')).toEqual('static/images/sad.png');
        });
      });
      describe("thows exception if string passed as argument is not the name of an expression in the library", () => {
        it("throws ''dog' is not the name of an expression in the library'", () => {
          const library = new Library();
          function makeImageSourceFromNonName() {library.makeImageSource('dog')}
          expect(makeImageSourceFromNonName).toThrowError(new Error("'dog' is not the name of an expression in the library"));
        });
      })
    });

    describe('.addSimilarTo', () => {
      describe('adds similar word passed in as parameter to similarTo property of expression passed as parameter', () => {
        it("adds 'bright' to similarTo array of 'happy' expression when addSimilarTo('bright', 'happy') is called", () => {
          const library = new Library(mockHappyExpression);
          library.addSimilarTo('bright', 'happy')
          expect(library.isSimilarTo('bright', 'happy')).toEqual(true)
        })
      })
      describe("thows exception if second argument passed as argument is not the name of an expression in the library", () => {
        it("throws 'dog' is not the name of an expression in the library'", () => {
          console.log('trow error test')
          mockHappyExpression.isSimilarTo = jest.fn().mockReturnValue(false)
          const library = new Library();
          function addSimilarToWithNonName() {library.addSimilarTo('bright', 'dog')}
          expect(addSimilarToWithNonName).toThrowError(new Error("'dog' is not the name of an expression in the library"));
        })
      })
    })
  })
})