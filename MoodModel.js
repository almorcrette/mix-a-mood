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

  _useMoodFromLibrary(emotion, cb) {
    this.addMessageToConsole('using the expression from the library');
    this._setMoodExpression(this.expressionsLibrary.retrieveExpression(emotion));
    this._setMood(emotion);
    cb();
    return this;
  }

  _raiseNoMatchInLibrary() {
    this.addMessageToConsole('no match to the expressions in the library')
    this._setMood(undefined);
  }

  _raiseFoundNoSimilarWords() {
    this.addMessageToConsole('no similar words found')
    this._setMoodExpression(null);
  }

  _addMessageToConsoleAttemptThesaurusLibraryMatch(similarWords) {
    let stringifiedSimilarWords = this._stringifyWordsArray(similarWords)
    this.addMessageToConsole(`similar words found by the thesaurus: ${stringifiedSimilarWords}`);
    this.addMessageToConsole('looking for match with expressions in library...');
  }

  _addMessageToConsoleAttemptLibraryMatch(emotion) {
    const downCaseEmotion = this.lowerCase(emotion);
    this.addMessageToConsole(`user input: ${emotion}`);
    this.addMessageToConsole(`input in lower case: ${downCaseEmotion}`);
    this.addMessageToConsole(`match with an expression in the library?: ${this.expressionsLibrary.isExpression(downCaseEmotion)}`);
  }

  _useThesaurusMatch(emotion, similarWords) {
    this._setMoodExpression(this.expressionsLibrary.firstMatchToExpression(similarWords));
    this.addMessageToConsole(`match found: ${emotion} is similar to ${this.getMoodExpression().getName()} which is in the library`);
    this._setMood(emotion);
  }

  processUserEmotion(emotion, cb) {
    const downCaseEmotion = this.lowerCase(emotion);
    this._addMessageToConsoleAttemptLibraryMatch(emotion)
    if (this.expressionsLibrary.isExpression(downCaseEmotion)) {
      this._useMoodFromLibrary(downCaseEmotion, cb)
    } else {
      this.addMessageToConsole('Searching the thesaurus...');
      this.thesaurusApi.isSimilarTo(emotion, (similarWords) => {
        if (similarWords.length === 0) {
          this._raiseFoundNoSimilarWords();
          this._raiseNoMatchInLibrary();
        } else {
          this._addMessageToConsoleAttemptThesaurusLibraryMatch(similarWords);
          if (this.expressionsLibrary.firstMatchToExpression(similarWords) === null) {
            this._raiseNoMatchInLibrary();
          } else {
            this._useThesaurusMatch(downCaseEmotion, similarWords);
          };
        };
        cb();
      });
    };
  };

  _setMoodToUserThesaurusLibraryMatch(emotion, cb) {
    this.thesaurusApi.isSimilarTo(emotion, (similarWords) => {
      if (similarWords.length === 0) {
        this.addMessageToConsole('no similar words found')
        cb(this._setMoodExpression(null));
      } else {
        let stringifiedSimilarWords = this._stringifyWordsArray(similarWords)
        this.addMessageToConsole(`similar words found by the thesaurus: ${stringifiedSimilarWords}`)
        this.addMessageToConsole('looking for match with expressions in library...')
        cb(this._setMoodExpression(this.expressionsLibrary.firstMatchToExpression(similarWords)));

      }
    });
  }

  addMessageToConsole(statement) {
    this.console.push(statement)
  }

  getConsole() {
    return this.console
  }

  clearConsole() {
    return this.console = [];
  }




  _processSimilarWords(similarWords) {}

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