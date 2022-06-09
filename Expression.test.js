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
          expect(expression.getImgSrc()).toEqual('static/images/name.jpg');
        });
        it("returns 'static/images/anotherName.jpg' for an expression initiated with 'anotherName' as parameter", () => {
          expression = new Expression('anotherName');
          expect(expression.getImgSrc()).toEqual('static/images/anotherName.jpg');
        });
      });
    });
  });
});