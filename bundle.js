(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // .env.js
  var require_env = __commonJS({
    ".env.js"(exports, module) {
      var ENV = {
        "X_RAPIDAPI_KEY": "efe97aba09msh85fb162e606845fp1ab198jsn2161044b71ed"
      };
      module.exports = ENV;
    }
  });

  // ThesaurusApi.js
  var require_ThesaurusApi = __commonJS({
    "ThesaurusApi.js"(exports, module) {
      var ENV = require_env();
      var ThesaurusApi = class {
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
              "X-RapidAPI-Key": ENV.X_RAPIDAPI_KEY
            }
          };
          fetch(url, options).then((res) => res.json()).then((json) => successCB(json)).catch((err) => errorCB(err));
        }
        standardErrorCB(err) {
          console.log("error:" + err);
        }
      };
      module.exports = ThesaurusApi;
    }
  });

  // ExpressionsLibrary.js
  var require_ExpressionsLibrary = __commonJS({
    "ExpressionsLibrary.js"(exports, module) {
      var ExpressionsLibrary = class {
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
        firstMatchToExpression(arr) {
          let wordMatch = null;
          arr.some((similarWord) => {
            this.expressions.some((expression) => {
              if (expression.getName() === similarWord) {
                wordMatch = expression.getName();
              }
              ;
              return wordMatch != null;
            });
            return wordMatch != null;
          });
          return wordMatch;
        }
      };
      module.exports = ExpressionsLibrary;
    }
  });

  // MoodModel.js
  var require_MoodModel = __commonJS({
    "MoodModel.js"(exports, module) {
      var ThesaurusApi = require_ThesaurusApi();
      var ExpressionsLibrary = require_ExpressionsLibrary();
      var MoodModel2 = class {
        constructor(thesaurusApi = new ThesaurusApi(), expressionsLibrary = new ExpressionsLibrary()) {
          this.thesaurusApi = thesaurusApi;
          this.expressionsLibrary = expressionsLibrary;
          this.emotionLibrary = ["happy", "sad", "curious", "tired"];
          this.mood = null;
        }
        getMood() {
          return this.mood;
        }
        setRandomMood(cb) {
          cb(this._setMood(this.expressionsLibrary.selectRandomExpression()));
        }
        processUserEmotion(emotion, cb) {
          if (this.expressionsLibrary.isExpression(emotion)) {
            this._setMood(emotion);
            cb();
            return this.mood;
          } else {
            this._setMoodToUserThesaurusLibraryMatch(emotion, cb);
          }
          ;
        }
        _setMoodToUserThesaurusLibraryMatch(emotion, cb) {
          this.thesaurusApi.isSimilarTo(emotion, (data) => {
            cb(this._setMood(this.expressionsLibrary.firstMatchToExpression(data)));
          });
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
          this.emotionSelectionContainerEl = document.querySelector("#emotion-selection-container");
          this.moodDisplayContainerEl = document.querySelector("#mood-result-container");
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
          this.emotionSelectionContainerEl.hidden = true;
        }
        displayMood() {
          this._displayMoodImage();
          this._displayMoodComment();
        }
        _displayMoodImage() {
          let moodDisplayEl = document.createElement("img");
          moodDisplayEl.classList.add("mood-display");
          moodDisplayEl.alt = `${this.moodModel.getMood()} face`;
          moodDisplayEl.id = `${this.moodModel.getMood()}-img`;
          moodDisplayEl.src = `static/images/${this.moodModel.getMood()}-full.jpg`;
          this.moodDisplayContainerEl.append(moodDisplayEl);
        }
        _displayMoodComment() {
          let moodTextDisplayEl = document.createElement("h3");
          moodTextDisplayEl.innerText = `You are feeling ${this.moodModel.getMood()}`;
          moodTextDisplayEl.classList.add("mood-display");
          this.moodDisplayContainerEl.append(moodTextDisplayEl);
        }
        displayPlayAgainButton() {
          this.playAgainButtonEl.hidden = false;
        }
        resetDisplay() {
          this.emotionSelectionContainerEl.hidden = false;
          this.emotionInputEl.value = null;
          document.querySelectorAll(".mood-display").forEach((element) => {
            element.remove();
          });
          document.querySelector("#play-again").hidden = true;
        }
      };
      module.exports = HomeViewModel2;
    }
  });

  // index.js
  var MoodModel = require_MoodModel();
  var HomeViewModel = require_HomeViewModel();
  var model = new MoodModel();
  var homeView = new HomeViewModel(model);
})();
