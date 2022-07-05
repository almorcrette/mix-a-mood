const Expression = require('./expression');

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
    
    describe('.addSimilarTo', () => {
      describe('adds similar word passed in as parameter to similarTo property', () => {
        it("adds 'exhausted' to similarTo array when addSimilarTo('expression') is called", () => {
          expression = new Expression('tired');
          expression.addSimilarTo('exhausted')
          expect(expression.similarTo[expression.similarTo.length - 1]).toEqual('exhausted')
        })
      })
    })
    describe('.isSimilarTo', () => {
      describe('returns whether word passed is element in similar words property', () => {
        it("returns true from 'exhausted' for an expression arranged with similarTo ['exhausted']", () => {
          expression = new Expression('tired');
          expression.addSimilarTo('exhausted')
          expect(expression.isSimilarTo('exhausted')).toEqual(true)
        });
        it("returns false from 'exhausted' for an expression arranged with similarTo []", () => {
          expression = new Expression('tired');
          expect(expression.isSimilarTo('exhausted')).toEqual(false)
        });
        it("returns true from 'knackered' for an expression arranged with similarTo ['knackered']", () => {
          expression = new Expression('tired');
          expression.addSimilarTo('knackered')
          expect(expression.isSimilarTo('knackered')).toEqual(true)
        });
        it("returns false from 'knackered' for an expression arranged with similarTo []", () => {
          expression = new Expression('tired');
          expect(expression.isSimilarTo('knackered')).toEqual(false)
        });
        it("returns true from 'exhausted' for an expression arranged with this as similarTo ['exhausted', knackered']", () => {
          expression = new Expression('tired');
          expression.addSimilarTo('exhausted')
          expression.addSimilarTo('knackered')
          expect(expression.isSimilarTo('exhausted')).toEqual(true)
        })
        it("returns true from 'knackered' for an expression arranged with this as similarTo ['exhausted', knackered']", () => {
          expression = new Expression('tired');
          expression.addSimilarTo('exhausted')
          expression.addSimilarTo('knackered')
          expect(expression.isSimilarTo('knackered')).toEqual(true)
        })
        it("returns false from 'energetic' for an expression arranged with this as similarTo ['exhausted', knackered']", () => {
          expression = new Expression('tired');
          expression.addSimilarTo('exhausted')
          expression.addSimilarTo('knackered')
          expect(expression.isSimilarTo('energetic')).toEqual(false)
        })
      })
    })
  });
});