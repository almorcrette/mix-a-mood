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
        }
        getName() {
          return this.name;
        }
        getImgSrc() {
          return `static/images/${this.name}.png`;
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
          let boolean = false;
          this.expressions.some((expression) => {
            if (emotion === expression.getName()) {
              boolean = true;
              return;
            }
            ;
          });
          return boolean;
        }
        retrieveExpression(emotion) {
          let record = null;
          this.expressions.some((expression) => {
            if (expression.getName() === emotion) {
              record = expression;
            }
          });
          return record;
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

  // .env.js
  var require_env = __commonJS({
    ".env.js"(exports, module) {
      var ENV = { "X_RapidAPI_Key": "efe97aba09msh85fb162e606845fp1ab198jsn2161044b71ed" };
      module.exports = ENV;
    }
  });

  // ThesaurusApi.js
  var require_ThesaurusApi = __commonJS({
    "ThesaurusApi.js"(exports, module) {
      var ENV = require_env();
      var ThesaurusApi2 = class {
        isSimilarTo(word, callback) {
          this.findSimilarTo(word, (data) => {
            callback(data.similarTo);
          }, this.standardErrorCB);
        }
        findSimilarTo(word, successCB, errorCB) {
          const url = `https://wordsapiv1.p.rapidapi.com/words/${word}/similarTo`;
          const options = {
            method: "GET",
            headers: {
              "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
              "X-RapidAPI-Key": ENV.X_RapidAPI_Key
            }
          };
          fetch(url, options).then((res) => res.json()).then((json) => successCB(json)).catch((err) => errorCB(err));
        }
        standardErrorCB(err) {
          console.log("error:" + err);
        }
      };
      module.exports = ThesaurusApi2;
    }
  });

  // MoodModel.js
  var require_MoodModel = __commonJS({
    "MoodModel.js"(exports, module) {
      var ThesaurusApi2 = require_ThesaurusApi();
      var ExpressionsLibrary2 = require_ExpressionsLibrary();
      var MoodModel2 = class {
        constructor(thesaurusApi2 = new ThesaurusApi2(), expressionsLibrary2 = new ExpressionsLibrary2()) {
          this.thesaurusApi = thesaurusApi2;
          this.expressionsLibrary = expressionsLibrary2;
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
          cb(this._setMoodExpression(this.expressionsLibrary.selectRandomExpression()));
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
            this._setMoodToUserThesaurusLibraryMatch(downCaseEmotion, cb);
            this._setMood(downCaseEmotion);
          }
          ;
        }
        _setMoodToUserThesaurusLibraryMatch(emotion, cb) {
          this.thesaurusApi.isSimilarTo(emotion, (similarWords) => {
            cb(this._setMoodExpression(this.expressionsLibrary.firstMatchToExpression(similarWords)));
          });
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
              this.displayMood();
              this.displayPlayAgainButton();
            });
          });
          this.randomiseButtonEl.addEventListener("click", () => {
            this.moodModel.setRandomMood((res) => {
              this.hideEmotionSelection();
              this.displayMood();
              this.displayPlayAgainButton();
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
        displayPlayAgainButton() {
          this.playAgainButtonEl.hidden = false;
        }
        resetDisplay() {
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
  var ThesaurusApi = require_ThesaurusApi();
  var MoodModel = require_MoodModel();
  var HomeViewModel = require_HomeViewModel();
  var expressionsLibrary = new ExpressionsLibrary(new Expression("happy"), new Expression("grateful"), new Expression("sad"), new Expression("tired"), new Expression("excited"), new Expression("tearful"), new Expression("nervous"), new Expression("curious"), new Expression("angry"), new Expression("amazed"), new Expression("surprised"), new Expression("enthusiastic"), new Expression("bored"), new Expression("joyous"), new Expression("lustful"), new Expression("unimpressed"), new Expression("content"), new Expression("thoughtful"), new Expression("worried"), new Expression("disgusted"), new Expression("fearful"));
  var thesaurusApi = new ThesaurusApi();
  var model = new MoodModel(thesaurusApi, expressionsLibrary);
  var homeView = new HomeViewModel(model);
})();
