class MoodLibraryModel {
  constructor(...args) {
    this.coreExpressions = args; 
  }
  selectRandomMood() {
    return this.coreExpressions[Math.floor(Math.random()*this.coreExpressions.length)]
  }

  isCoreExpression(emotion) {
    let boolean = false;
    this.coreExpressions.some((expression) => {
      if (emotion === expression) {
        boolean = true;
        return;
      };
    });
    return boolean;
  }

  matchInLibrary(arr) {
    let wordMatch = null;
    arr.some((similarWord) => {
      this.coreExpressions.some((coreExpression) => {
        if (coreExpression === similarWord) {
          wordMatch = coreExpression;
        };
        return wordMatch != null;
      });
      return wordMatch != null;
    });
    return wordMatch;
  }

}

module.exports = MoodLibraryModel;