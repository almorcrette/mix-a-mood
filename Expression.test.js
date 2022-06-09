const Expression = require('./Expression');

describe('Expression', () => {
  describe('.prototype', () => {
    describe('.getName', () => {
      describe('returns the name of the expression', () => {
        it("returns 'name' for an expression initiated with 'name' as parameter", () => {
          expression = new Expression('name');
          expect(expression.getName()).toEqual('name');
        })
        it("returns 'anotherName' for an expression initiated with 'anotherName' as parameter", () => {
          expression = new Expression('anotherName');
          expect(expression.getName()).toEqual('anotherName');
        })
      })
    })
  })
})