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
      console.log('test for processUserEmtion with not-an-emotion. reached the else clause with: ', emotion)
      this._setMoodToUserThesaurusLibraryMatch(downCaseEmotion, (res) => {
        if (this._getMoodExpression === undefined) {
          this._setMood(undefined);
        } else {
          this._setMood(downCaseEmotion);
        }
        cb();
      });
       // add condition so that if if the moodExpression is undefined, then mood is set to undefined
    };
  }

  _setMoodToUserThesaurusLibraryMatch(emotion, cb) {
    console.log('test for processUserEmtion with not-an-emotion. reached inside setMoodToUserThesaurusLibraryMatch with: ', emotion)
    this.thesaurusApi.isSimilarTo(emotion, (similarWords) => {
      console.log('test for processUserEmtion with not-an-emotion. reached callback for thesaurus search with: ', similarWords)
      if (similarWords.length === 0) {
        cb(this._setMoodExpression(undefined));
      } else {
        cb(this._setMoodExpression(this.expressionsLibrary.firstMatchToExpression(similarWords)))
      }
        // add an escape clause which sets moodExpression
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