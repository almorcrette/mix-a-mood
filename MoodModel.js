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
    this.console = [];
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
    this.logToConsole(`user input: ${emotion}`);
    const downCaseEmotion = this.lowerCase(emotion);
    this.logToConsole(`input in lower case: ${downCaseEmotion}`);
    this.logToConsole(`match with an expression in the library?: ${this.expressionsLibrary.isExpression(downCaseEmotion)}`);
    if (this.expressionsLibrary.isExpression(downCaseEmotion)) {
      this.logToConsole('using the expression from the library');
      this._setMoodExpression(this.expressionsLibrary.retrieveExpression(downCaseEmotion));
      this._setMood(downCaseEmotion);
      cb();
      return this;
    } else {
      this.logToConsole('Searching the thesaurus...');
      this._setMoodToUserThesaurusLibraryMatch(downCaseEmotion, (res) => {
        if (res === null) {
          this.logToConsole('no match to the expressions in the library')
          this._setMood(undefined);
        } else {
          this.logToConsole(`match found: ${downCaseEmotion} is similar to ${res.getName()} which is in the library`)
          this._setMood(downCaseEmotion);
        };
        cb();
      });
    };
  };

  logToConsole(statement) {
    this.console.push(statement)
  }

  getConsole() {
    return this.console
  }

  clearConsole() {
    return this.console = [];
  }


  _setMoodToUserThesaurusLibraryMatch(emotion, cb) {
    this.thesaurusApi.isSimilarTo(emotion, (similarWords) => {
      if (similarWords.length === 0) {
        this.logToConsole('no similar words found')
        cb(this._setMoodExpression(null));
      } else {
        let stringifiedSimilarWords = this._stringifyWordsArray(similarWords)
        this.logToConsole(`similar words found by the thesaurus: ${stringifiedSimilarWords}`)
        this.logToConsole('looking for match with expressions in library...')
        cb(this._setMoodExpression(this.expressionsLibrary.firstMatchToExpression(similarWords)));

      }
    });
  }

  _stringifyWordsArray(array) {
    let stringifiedWords = '';
    array.forEach((word) => {
      stringifiedWords = stringifiedWords.concat(word + ', ');
    })
    stringifiedWords = stringifiedWords.slice(0, -2);
    return stringifiedWords;
  }

  _setMoodExpression(expression) {
    return this.moodExpression = expression;
  }

  _setMood(emotion) {
    return this.mood = emotion; 
  }

}

module.exports = MoodModel;