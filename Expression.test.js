const Expression = require('./Expression');

describe('Expression', () => {
  describe('.prototype', () => {
    describe('.getName', () => {
      describe('returns the name of the expression', () => {
        it("returns 'name' for an expression initiated with 'name' as parameter", () => {
          expression = new Expression('name');
          expect(expression.getName()).toEqual('name');
        });
        it("returns 'anotherName' for an expression initiated with 'anotherName' as parameter", () => {
          expression = new Expression('anotherName');
          expect(expression.getName()).toEqual('anotherName');
        });
      });
    });
    describe('.getImgSrc', () => {
      describe("returns the url of the expression's image", () => {
        it("returns 'static/images/name.jpg' for an expression initiated with 'name' as parameter", () => {
          expression = new Expression('name');
          expect(expression.getImgSrc()).toEqual('static/images/name.png');
        });
        it("returns 'static/images/anotherName.jpg' for an expression initiated with 'anotherName' as parameter", () => {
          expression = new Expression('anotherName');
          expect(expression.getImgSrc()).toEqual('static/images/anotherName.png');
        });
      });
    });
    describe('.addSimilarTo', () => {
      describe('adds similar word passed in as parameter to similarTo property', () => {
        it("adds 'exhausted' to similarTo array when addSimilarTo('expression') is called", () => {
          expression = new Expression('tired');
          expression.addSimilarTo('exhausted')
          expect(expression.similarTo[expression.similarTo.length - 1]).toEqual('exhausted')
        })
      })
    })
    describe('.getSimilarTo', () => {
      describe('returns attribute of similar word', () => {
        it("returns ['exhausted'] for an expression arranged with this as similarTo", () => {
          expression = new Expression('tired');
          expression.addSimilarTo('exhausted')
          expect(expression.getSimilarTo()).toEqual(['exhausted'])
        });
        it("returns ['exhausted', 'knackered'] for an expression arranged with this as similarTo", () => {
          expression = new Expression('tired');
          expression.addSimilarTo('exhausted')
          expression.addSimilarTo('knackered')
          expect(expression.getSimilarTo()).toEqual(['exhausted', 'knackered'])
        })
      })
    })
  });
});