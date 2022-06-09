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

  retrieveExpression(emotion) {
    let record = null;
    this.expressions.some((expression) => {
      if (expression.getName() === emotion) {
        record = expression;
      }
    })
    return record;
  }

  firstMatchToExpression(arr) {
    let expressionMatch = null;
    arr.some((similarWord) => {
      this.expressions.some((expression) => {
        if (expression.getName() === similarWord) {
          expressionMatch = expression;
        };
        return expressionMatch != null;
      });
      return expressionMatch != null;
    });
    return expressionMatch;
  }

}

module.exports = ExpressionsLibrary;