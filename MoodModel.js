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
    this.mood = null;
    this.moodExpression = null;
  }

  getMood() {
    return this.mood;
  }

  getMoodExpression() {
    return this.moodExpression;
  }

  setRandomMood(cb) {
    cb(
      this._setMoodExpression(
        this.expressionsLibrary.selectRandomExpression()
      )
    )
  }

  lowerCase(emotion) {
    return emotion.toLowerCase(emotion);
  }

  processUserEmotion(emotion, cb) {
    const downCaseEmotion = this.lowerCase(emotion);
    if (this.expressionsLibrary.isExpression(downCaseEmotion)) {
      this._setMoodExpression(this.expressionsLibrary.retrieveExpression(downCaseEmotion));
      this._setMood(downCaseEmotion);
      cb();
      return this.moodExpression;
    } else {
      this._setMoodToUserThesaurusLibraryMatch(downCaseEmotion, (res) => {
        if (res === null) {
          this._setMood(undefined);
        } else {
          this._setMood(downCaseEmotion);
        }
        cb();
      });
    };
  }

  _setMoodToUserThesaurusLibraryMatch(emotion, cb) {
    this.thesaurusApi.isSimilarTo(emotion, (similarWords) => {
      if (similarWords.length === 0) {
        cb(this._setMoodExpression(undefined));
      } else {
        cb(this._setMoodExpression(this.expressionsLibrary.firstMatchToExpression(similarWords)));        
      }
    });
  }

  _setMoodExpression(expression) {
    return this.moodExpression = expression;
  }

  _setMood(emotion) {
    return this.mood = emotion; 
  }

}

module.exports = MoodModel;