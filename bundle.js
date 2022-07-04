(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // Expression.js
  var require_Expression = __commonJS({
    "Expression.js"(exports, module) {
      var Expression2 = class {
        constructor(name) {
          this.name = name;
          this.similarTo = [];
        }
        getName() {
          return this.name;
        }
        getImgSrc() {
          return `static/images/${this.name}.png`;
        }
        addSimilarTo(emotion) {
          return this.similarTo.push(emotion);
        }
        isSimilarTo(emotion) {
          let boolean = false;
          this.similarTo.forEach((similarWord) => {
            if (emotion === similarWord) {
              boolean = true;
              return;
            }
          });
          return boolean;
        }
      };
      module.exports = Expression2;
    }
  });

  // ExpressionsLibrary.js
  var require_ExpressionsLibrary = __commonJS({
    "ExpressionsLibrary.js"(exports, module) {
      var ExpressionsLibrary2 = class {
        constructor(...expressions) {
          this.expressions = expressions;
        }
        selectRandomExpression() {
          return this.expressions[Math.floor(Math.random() * this.expressions.length)];
        }
        isExpression(emotion) {
          let downCaseEmotion = emotion.toLowerCase();
          let boolean = false;
          this.expressions.some((expression) => {
            if (downCaseEmotion === expression.getName()) {
              boolean = true;
              return;
            }
            ;
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
          });
          return record;
        }
        hasSimilarExpression(emotion) {
          console.log("inside hasSimilarExpression with: ", emotion);
          let boolean = false;
          this.expressions.forEach((expression) => {
            if (expression.isSimilarTo(emotion) === true) {
              boolean = true;
              return;
            }
            ;
          });
          console.log("hasSimilarExpression returning: ", boolean);
          return boolean;
        }
        retrieveSimilarExpression(emotion) {
          console.log("inside retrieveSimilarExpression with: ", emotion);
          let matchingExpression = null;
          this.expressions.forEach((expression) => {
            if (expression.isSimilarTo(emotion) === true) {
              matchingExpression = expression;
              return;
            }
          });
          console.log("retrieveSimilarExpression returning: ", matchingExpression);
          return matchingExpression;
        }
        hasMatchInLibrary(arr) {
          let boolean = false;
          arr.some((similarWord) => {
            this.expressions.some((expression) => {
              if (expression.getName() === similarWord) {
                boolean = true;
              }
              ;
              return boolean === true;
            });
            return boolean === true;
          });
          return boolean;
        }
        firstMatchToExpression(arr) {
          let expressionMatch = null;
          arr.some((similarWord) => {
            this.expressions.some((expression) => {
              if (expression.getName() === similarWord) {
                expressionMatch = expression;
              }
              ;
              return expressionMatch != null;
            });
            return expressionMatch != null;
          });
          return expressionMatch;
        }
      };
      module.exports = ExpressionsLibrary2;
    }
  });

  // EmotionsApi.js
  var require_EmotionsApi = __commonJS({
    "EmotionsApi.js"(exports, module) {
      var EmotionsApi2 = class {
        constructor() {
        }
        fetchSimilarWords(emotion, cb) {
          const url = `/emotions/${emotion}`;
          const options = {
            method: "GET"
          };
          fetch(url, options).then((res) => {
            return res.json();
          }).then((similarWords) => {
            cb(similarWords);
          });
        }
      };
      module.exports = EmotionsApi2;
    }
  });

  // MoodModel.js
  var require_MoodModel = __commonJS({
    "MoodModel.js"(exports, module) {
      var ExpressionsLibrary2 = require_ExpressionsLibrary();
      var EmotionsApi2 = require_EmotionsApi();
      var MoodModel2 = class {
        constructor(emotionsApi2 = new EmotionsApi2(), expressionsLibrary2 = new ExpressionsLibrary2()) {
          this.emotionsApi = emotionsApi2;
          this.expressionsLibrary = expressionsLibrary2;
          this.mood = null;
          this.moodExpression = null;
          this.console = [];
        }
        setRandomMood(cb) {
          cb(this._selectRandomLibraryExpression());
        }
        _selectRandomLibraryExpression() {
          this.addMessageToConsole("randomly selecting a expression in the library...");
          let randomExpression = this.expressionsLibrary.selectRandomExpression();
          this.addMessageToConsole(`selected expression: ${randomExpression.getName()}`);
          this._setMoodExpression(randomExpression);
          return this._setMood(randomExpression.getName());
        }
        processUserEmotion(emotion, cb) {
          this._addMessagesToConsoleAttemptLibraryMatch(emotion);
          if (this.expressionsLibrary.isExpression(emotion)) {
            this._useMoodFromLibrary(emotion, cb);
          } else {
            this.addMessageToConsole("no exact match with expressions in library");
            this.addMessageToConsole("checking the cache of previous, successful thesaurus queries...");
            if (this.expressionsLibrary.hasSimilarExpression(emotion)) {
              this.addMessageToConsole("found a match in the cache");
              this._useSimilarMoodFromLibrary(emotion, cb);
            } else {
              this.addMessageToConsole("no match in the cache");
              this._findMoodUsingThesaurus(emotion, cb);
            }
            ;
          }
        }
        getMood() {
          return this.mood;
        }
        getMoodExpression() {
          return this.moodExpression;
        }
        addMessageToConsole(statement) {
          this.console.push(statement);
        }
        getConsole() {
          return this.console;
        }
        clearConsole() {
          return this.console = [];
        }
        _useSimilarMoodFromLibrary(emotion, cb) {
          this._setMoodExpression(this.expressionsLibrary.retrieveSimilarExpression(emotion));
          this._setMood(emotion.toLowerCase());
          this.addMessageToConsole(`using the match from the cache: ${emotion.toLowerCase()} is similar to ${this.getMoodExpression().getName()} which is in the library`);
          cb();
          return this;
        }
        _useMoodFromLibrary(emotion, cb) {
          this.addMessageToConsole("using the expression from the library");
          this._setMoodExpression(this.expressionsLibrary.retrieveExpression(emotion));
          this._setMood(emotion.toLowerCase());
          cb();
          return this;
        }
        _findMoodUsingThesaurus(emotion, cb) {
          this.addMessageToConsole("Searching the thesaurus (WordsApi)...");
          this.emotionsApi.fetchSimilarWords(emotion, (similarWords) => {
            if (similarWords.length === 0) {
              this._raiseFoundNoSimilarWords();
              this._raiseNoMatchInLibrary();
            } else {
              this._addMessagesToConsoleSimilarWordsAttemptLibraryMatch(similarWords);
              if (this.expressionsLibrary.hasMatchInLibrary(similarWords)) {
                this._useThesaurusMatch(emotion, similarWords);
                this._cacheThesaurusFind(this.moodExpression, emotion);
              } else {
                this._raiseNoMatchInLibrary();
              }
              ;
            }
            ;
            cb();
          });
        }
        _cacheThesaurusFind(expression, emotion) {
          expression.addSimilarTo(emotion.toLowerCase());
        }
        _useThesaurusMatch(emotion, similarWords) {
          this._setMoodExpression(this.expressionsLibrary.firstMatchToExpression(similarWords));
          this.addMessageToConsole(`match found: ${emotion.toLowerCase()} is similar to ${this.getMoodExpression().getName()} which is in the library`);
          this._setMood(emotion.toLowerCase());
          return this.getMoodExpression;
        }
        _raiseNoMatchInLibrary() {
          this.addMessageToConsole("no match to the expressions in the library");
          this._setMood(void 0);
        }
        _raiseFoundNoSimilarWords() {
          this.addMessageToConsole("no similar words found");
          this._setMoodExpression(null);
        }
        _addMessagesToConsoleSimilarWordsAttemptLibraryMatch(similarWords) {
          if (similarWords.length === 1) {
            this.addMessageToConsole("One similar word found in the thesaurus");
          } else {
            this.addMessageToConsole(`${similarWords.length} similar words found in the thesaurus`);
          }
          this.addMessageToConsole("looking for match with expressions in library...");
        }
        _addMessagesToConsoleAttemptLibraryMatch(emotion) {
          let downCaseEmotion = emotion.toLowerCase();
          this.addMessageToConsole(`user input: ${emotion}`);
          this.addMessageToConsole(`input in lower case: ${downCaseEmotion}`);
          this.addMessageToConsole(`match with an expression in the library? ${this.expressionsLibrary.isExpression(downCaseEmotion)}`);
        }
        _setMoodExpression(expression) {
          return this.moodExpression = expression;
        }
        _setMood(emotion) {
          return this.mood = emotion;
        }
      };
      module.exports = MoodModel2;
    }
  });

  // HomeViewModel.js
  var require_HomeViewModel = __commonJS({
    "HomeViewModel.js"(exports, module) {
      var MoodModel2 = require_MoodModel();
      var HomeViewModel2 = class {
        constructor(moodModel = new MoodModel2()) {
          this.moodModel = moodModel;
          this.dialogueContainerEl = document.querySelector("#dialogue-container");
          this.expressionContainerEl = document.querySelector("#expression-container");
          this.emotionSelectionEls = document.querySelectorAll(".emotion-selection");
          this.emotionInputEl = document.querySelector("input#emotion-input");
          this.generateButtonEl = document.querySelector("button#generate");
          this.randomiseButtonEl = document.querySelector("button#randomise");
          this.playAgainButtonEl = document.querySelector("button#play-again");
          this.generateButtonEl.addEventListener("click", () => {
            this.moodModel.processUserEmotion(this.emotionInputEl.value, (res) => {
              this.hideEmotionSelection();
              if (this.moodModel.getMood() === void 0) {
                this.displayNotFound();
              } else {
                this.displayMood();
              }
              this.displayPlayAgainButton();
              this.displayConsole();
            });
          });
          this.randomiseButtonEl.addEventListener("click", () => {
            this.moodModel.setRandomMood((res) => {
              this.hideEmotionSelection();
              this.displayMood();
              this.displayPlayAgainButton();
              this.displayConsole();
            });
          });
          this.playAgainButtonEl.addEventListener("click", () => {
            this.resetDisplay();
          });
        }
        hideEmotionSelection() {
          this.emotionSelectionEls.forEach((element) => {
            element.hidden = true;
          });
        }
        displayMood() {
          document.querySelector("#prototype-expression").hidden = true;
          this._displayMoodImage();
          this._displayMoodComment();
        }
        _displayMoodImage() {
          let moodDisplayEl = document.createElement("img");
          moodDisplayEl.classList.add("mood-display");
          moodDisplayEl.alt = `${this.moodModel.getMoodExpression().getName()} face`;
          moodDisplayEl.id = `${this.moodModel.getMoodExpression().getName()}-img`;
          moodDisplayEl.src = this.moodModel.getMoodExpression().getImgSrc();
          this.expressionContainerEl.append(moodDisplayEl);
        }
        _displayMoodComment() {
          let moodTextDisplayEl = document.createElement("h3");
          moodTextDisplayEl.innerText = `You are feeling ${this.moodModel.getMood()}`;
          moodTextDisplayEl.classList.add("mood-display");
          document.querySelector("#mood-dialogue-result-container").append(moodTextDisplayEl);
        }
        displayConsole() {
          this.moodModel.getConsole().forEach((message) => {
            let consoleMessageEl = document.createElement("li");
            consoleMessageEl.classList.add("console-message");
            consoleMessageEl.innerText = message;
            document.querySelector("#console-list").append(consoleMessageEl);
          });
        }
        displayNotFound() {
          document.querySelector("#prototype-expression").hidden = true;
          let moodDisplayEl = document.createElement("img");
          moodDisplayEl.classList.add("mood-display");
          moodDisplayEl.alt = `mood not found`;
          moodDisplayEl.id = `not-found-img`;
          moodDisplayEl.src = `static/images/not-found.png`;
          this.expressionContainerEl.append(moodDisplayEl);
          let moodTextDisplayEl = document.createElement("h3");
          moodTextDisplayEl.innerText = `I don't recognise that mood`;
          moodTextDisplayEl.classList.add("mood-display");
          document.querySelector("#mood-dialogue-result-container").append(moodTextDisplayEl);
        }
        displayPlayAgainButton() {
          this.playAgainButtonEl.hidden = false;
        }
        resetDisplay() {
          document.querySelectorAll(".console-message").forEach((message) => {
            message.remove();
          });
          this.moodModel.clearConsole();
          this.emotionSelectionEls.forEach((element) => {
            element.hidden = false;
          });
          this.emotionInputEl.value = null;
          document.querySelectorAll(".mood-display").forEach((element) => {
            element.remove();
          });
          document.querySelector("#play-again").hidden = true;
          document.querySelector("#prototype-expression").hidden = false;
        }
      };
      module.exports = HomeViewModel2;
    }
  });

  // index.js
  var Expression = require_Expression();
  var ExpressionsLibrary = require_ExpressionsLibrary();
  var EmotionsApi = require_EmotionsApi();
  var MoodModel = require_MoodModel();
  var HomeViewModel = require_HomeViewModel();
  var expressionsLibrary = new ExpressionsLibrary(new Expression("happy"), new Expression("grateful"), new Expression("sad"), new Expression("tired"), new Expression("excited"), new Expression("tearful"), new Expression("nervous"), new Expression("curious"), new Expression("angry"), new Expression("amazed"), new Expression("surprised"), new Expression("enthusiastic"), new Expression("bored"), new Expression("joyous"), new Expression("lustful"), new Expression("unimpressed"), new Expression("content"), new Expression("thoughtful"), new Expression("worried"), new Expression("disgusted"), new Expression("fearful"));
  var emotionsApi = new EmotionsApi();
  var model = new MoodModel(emotionsApi, expressionsLibrary);
  var homeView = new HomeViewModel(model);
})();
