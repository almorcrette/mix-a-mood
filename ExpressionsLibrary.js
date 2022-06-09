class ExpressionsLibrary {
  constructor(...args) {
    this.expressions = args; 
  }

  selectRandomExpression() {
    return this.expressions[Math.floor(Math.random()*this.expressions.length)]
  }

  isExpression(emotion) {
    let boolean = false;
    this.expressions.some((expression) => {
      if (emotion === expression) {
        boolean = true;
        return;
      };
    });
    return boolean;
  }

  firstMatchToExpression(arr) {
    let wordMatch = null;
    arr.some((similarWord) => {
      this.expressions.some((expression) => {
        if (expression === similarWord) {
          wordMatch = expression;
        };
        return wordMatch != null;
      });
      return wordMatch != null;
    });
    return wordMatch;
  }

}

module.exports = ExpressionsLibrary;