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

  hasSimilarExpression(emotion) {
    let boolean = false;
    this.expressions.forEach((expression) => {
      if (expression.isSimilarTo(emotion) === true) {
        boolean = true;
        return;
      };
    });
    return boolean
  }

  retrieveSimilarExpression(emotion) {
    let matchingExpression = null;
    this.expressions.forEach((expression) => {
      if (expression.isSimilarTo(emotion) === true) {
        matchingExpression = expression;
        return
      }
    })
    return matchingExpression
  }

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