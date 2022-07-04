class ExpressionsLibrary {
  constructor(...expressions) {
    this.expressions = expressions; 
  }

  selectRandomExpression() {
    return this.expressions[Math.floor(Math.random()*this.expressions.length)]
  }

  isExpression(emotion) {
    let downCaseEmotion = emotion.toLowerCase();
    let boolean = false;
    this.expressions.some((expression) => {
      if (downCaseEmotion === expression.getName()) {
        boolean = true;
        return;
      };
    });
    return boolean;
  }

  //hasSimilarExpression

  retrieveExpression(emotion) {
    let downCaseEmotion = emotion.toLowerCase();
    let record = null;
    this.expressions.some((expression) => {
      if (expression.getName() === downCaseEmotion) {
        record = expression;
      }
    })
    return record;
  }

  //retrieveSimilarExpression



  hasMatchInLibrary(arr) {
    let boolean = false;
    arr.some((similarWord) => {
      this.expressions.some((expression) => {
        if (expression.getName() === similarWord) {
          boolean = true;
        };
        return boolean === true;
      });
      return boolean === true
    });
    return boolean;
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