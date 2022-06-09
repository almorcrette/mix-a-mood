const ThesaurusApi = require('./ThesaurusApi');
const ExpressionsLibrary = require('./ExpressionsLibrary');
// const Expression = require('./Expression');

class MoodModel {
  constructor(
    thesaurusApi = new ThesaurusApi(),
    expressionsLibrary = new ExpressionsLibrary()
    ) {
    this.thesaurusApi = thesaurusApi;
    this.expressionsLibrary = expressionsLibrary;
    this.moodExpression = null;
  }

  getMoodExpression() {
    return this.moodExpression;
  }

  setRandomMood(cb) {
    // console.log('expressionsLibrary: ', this.expressionsLibrary)
    // console.log('expressionsLibrary.expressions: ', this.expressionsLibrary.expressions)
    cb(
      this._setMoodExpression(
        this.expressionsLibrary.selectRandomExpression()
      )
    )
  }

  processUserEmotion(emotion, cb) {
    if (this.expressionsLibrary.isExpression(emotion)) {
      this._setMoodExpression(this.expressionsLibrary.retrieveExpression(emotion));
      cb();
      return this.moodExpression;
    } else {
      this._setMoodToUserThesaurusLibraryMatch(emotion, cb)
    };
  }

  _setMoodToUserThesaurusLibraryMatch(emotion, cb) {
    this.thesaurusApi.isSimilarTo(emotion, (similarWords) => {
      cb(this._setMoodExpression(this.expressionsLibrary.firstMatchToExpression(similarWords)))
    });
  }

  _setMoodExpression(expression) {
    return this.moodExpression = expression;
  }

}

module.exports = MoodModel;