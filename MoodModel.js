const ThesaurusApi = require('./ThesaurusApi');
const ExpressionsLibrary = require('./ExpressionsLibrary');

class MoodModel {
  constructor(
    thesaurusApi = new ThesaurusApi(),
    expressionsLibrary = new ExpressionsLibrary()
    ) {
    this.thesaurusApi = thesaurusApi;
    this.expressionsLibrary = expressionsLibrary;
    this.emotionLibrary = ["happy", "sad", "curious", "tired"];
    this.mood = null;
  }

  getMood() {
    return this.mood;
  }

  setRandomMood(cb) {
    cb(
      this._setMood(
        this.expressionsLibrary.selectRandomExpression()
      )
    )
  }

  processUserEmotion(emotion, cb) {
    if (this.expressionsLibrary.isExpression(emotion)) {
      this._setMood(emotion);
      cb();
      return this.mood;
    } else {
      this._setMoodToUserThesaurusLibraryMatch(emotion, cb)
    };
  }

  _setMoodToUserThesaurusLibraryMatch(emotion, cb) {
    this.thesaurusApi.isSimilarTo(emotion, (data) => {
      cb(this._setMood(this.expressionsLibrary.firstMatchToExpression(data)))
    });
  }

  _setMood(emotion) {
    return this.mood = emotion;
  }

}

module.exports = MoodModel;