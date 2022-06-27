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
    console.log('user input: ', emotion)
    const downCaseEmotion = this.lowerCase(emotion);
    console.log('input in lower case: ', downCaseEmotion)
    console.log('matching library expression?: ', this.expressionsLibrary.isExpression(downCaseEmotion))
    if (this.expressionsLibrary.isExpression(downCaseEmotion)) {
      console.log('Using the expression from the library')
      this._setMoodExpression(this.expressionsLibrary.retrieveExpression(downCaseEmotion));
      this._setMood(downCaseEmotion);
      cb();
      return this.moodExpression;
    } else {
      console.log('Searching the thesaurus...');
      this._setMoodToUserThesaurusLibraryMatch(downCaseEmotion, (res) => {
        if (res === null) {
          this._setMood(undefined);
        } else {
          this._setMood(downCaseEmotion);
        };
        cb();
      });
    };
  }

  _setMoodToUserThesaurusLibraryMatch(emotion, cb) {
    this.thesaurusApi.isSimilarTo(emotion, (similarWords) => {
      console.log('Similar words found by the thesaurus: ', similarWords)
      if (similarWords.length === 0) {
        console.log('No similar words. Setting mood expression to null')
        cb(this._setMoodExpression(null));
      } else {
        console.log('Setting the expression to the first similar word thats a match to the similar words in the thesaurus...')
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