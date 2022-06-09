class ExpressionsLibrary {
  constructor(...expressions) {
    this.expressions = expressions; 
  }

  selectRandomExpression() {
    return this.expressions[Math.floor(Math.random()*this.expressions.length)]
  }

  isExpression(emotion) {
    let boolean = false;
    this.expressions.some((expression) => {
      if (emotion === expression.getName()) {
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
        if (expression.getName() === similarWord) {
          wordMatch = expression.getName();
        };
        return wordMatch != null;
      });
      return wordMatch != null;
    });
    return wordMatch;
  }

}

module.exports = ExpressionsLibrary;