const ExpressionsLibrary = require('./ExpressionsLibrary');
const EmotionsApi = require('./EmotionsApi');

class MoodModel {
  constructor(
    emotionsApi = new EmotionsApi(),
    expressionsLibrary = new ExpressionsLibrary()
    ) {
    this.emotionsApi = emotionsApi;
    this.expressionsLibrary = expressionsLibrary;
    this.mood = null;
    this.moodExpression = null;
    this.console = [];
  }

  setRandomMood(cb) {
    // console.log('')
    cb(this._selectRandomLibraryExpression())
  }
  
  _selectRandomLibraryExpression() {
    let randomExpression = this.expressionsLibrary.selectRandomExpression();
    this._setMoodExpression(randomExpression);
    return this._setMood(randomExpression.getName());
  }

  processUserEmotion(emotion, cb) {
    this._addMessagesToConsoleAttemptLibraryMatch(emotion);
    if (this.expressionsLibrary.isExpression(emotion)) {
      this._useMoodFromLibrary(emotion, cb);
    } else {
      this._findMoodUsingThesaurus(emotion, cb);
      
    };
  };

  getMood() {
    return this.mood;
  }

  getMoodExpression() {
    return this.moodExpression;
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

  _useMoodFromLibrary(emotion, cb) {
    this.addMessageToConsole('using the expression from the library');
    this._setMoodExpression(this.expressionsLibrary.retrieveExpression(emotion));
    this._setMood(emotion.toLowerCase());
    cb();
    return this;
  }

  _findMoodUsingThesaurus(emotion, cb) {
    this.addMessageToConsole('Searching the thesaurus (WordsApi)...');
    this.emotionsApi.fetchSimilarWords(emotion, (similarWords) => {
        if (similarWords.length === 0) {
          this._raiseFoundNoSimilarWords();
          this._raiseNoMatchInLibrary();
        } else {
          this._addMessagesToConsoleSimilarWordsAttemptLibraryMatch(similarWords);
          if (this.expressionsLibrary.hasMatchInLibrary(similarWords)) {
            this._useThesaurusMatch(emotion, similarWords);
          } else {
            this._raiseNoMatchInLibrary();
          };
        };
        cb();
      });
  }

  _useThesaurusMatch(emotion, similarWords) {
    this._setMoodExpression(this.expressionsLibrary.firstMatchToExpression(similarWords));
    this.addMessageToConsole(
      `match found: ${
        emotion.toLowerCase()
      } is similar to ${
        this.getMoodExpression().getName()
      } which is in the library`);
    this._setMood(emotion.toLowerCase());
  }

  _raiseNoMatchInLibrary() {
    this.addMessageToConsole('no match to the expressions in the library')
    this._setMood(undefined);
  }

  _raiseFoundNoSimilarWords() {
    this.addMessageToConsole('no similar words found')
    this._setMoodExpression(null);
  }

  _addMessagesToConsoleSimilarWordsAttemptLibraryMatch(similarWords) {
    if (similarWords.length === 1) {
      this.addMessageToConsole('One similar word found in the thesaurus');
    } else {
      this.addMessageToConsole(`${similarWords.length} similar words found in the thesaurus`);

    }
    this.addMessageToConsole('looking for match with expressions in library...');
  }

  _addMessagesToConsoleAttemptLibraryMatch(emotion) {
    let downCaseEmotion = emotion.toLowerCase();
    this.addMessageToConsole(`user input: ${emotion}`);
    this.addMessageToConsole(`input in lower case: ${downCaseEmotion}`);
    this.addMessageToConsole(`match with an expression in the library?: ${this.expressionsLibrary.isExpression(downCaseEmotion)}`);
  }

  _setMoodExpression(expression) {
    return this.moodExpression = expression;
  }

  _setMood(emotion) {
    return this.mood = emotion; 
  }

}

module.exports = MoodModel;