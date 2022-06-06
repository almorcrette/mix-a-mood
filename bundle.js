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

  // MoodModel.js
  var require_MoodModel = __commonJS({
    "MoodModel.js"(exports, module) {
      var ThesaurusApi = require_ThesaurusApi();
      var MoodModel2 = class {
        constructor(thesaurusApi = new ThesaurusApi()) {
          this.thesaurusApi = thesaurusApi;
          this._moodLibrary = ["happy", "sad", "curious", "tired"];
        }
        setMood(emotion) {
          this.mood = emotion;
        }
        setRandomMood() {
          this.mood = this._moodLibrary[Math.floor(Math.random() * this._moodLibrary.length)];
        }
        setMoodReferencingLibrary(emotion, cb) {
          this.mood = null;
          this._moodLibrary.some((mood) => {
            if (emotion === mood) {
              this.mood = emotion;
              return this.mood;
            }
          });
          if (this.mood != null) {
            cb();
            return this.mood;
          } else {
            this.thesaurusApi.isSimilarTo(emotion, (data) => {
              cb(this.setMood(this.matchInLibrary(data)));
            });
          }
        }
        getMood() {
          return this.mood;
        }
        get emotions() {
          return this._moodLibrary;
        }
        matchInLibrary(data) {
          let wordMatch = null;
          data.some((similarWord) => {
            this._moodLibrary.some((libraryWord) => {
              if (libraryWord === similarWord) {
                wordMatch = libraryWord;
              }
              ;
              return wordMatch != null;
            });
            return wordMatch != null;
          });
          return wordMatch;
        }
      };
      module.exports = MoodModel2;
    }
  });

  // View.js
  var require_View = __commonJS({
    "View.js"(exports, module) {
      var MoodModel2 = require_MoodModel();
      var View2 = class {
        constructor(moodModel = new MoodModel2()) {
          this.moodModel = moodModel;
          this.emotionSelectorEls = [
            document.querySelector("#happy"),
            document.querySelector("#sad"),
            document.querySelector("#tired")
          ];
          document.querySelector("#generate").addEventListener("click", () => {
            console.log("generate button pressed");
            this.emotionSelectorEls.forEach((emotion) => {
              if (emotion.checked == true) {
                this.generateMood(emotion.value);
              }
            });
            this.displayMood();
            this.displayPlayAgainButton();
          });
          document.querySelector("button#randomise").addEventListener("click", () => {
            this.randomiseMood();
            this.displayMood();
            this.displayPlayAgainButton();
          });
          document.querySelector("#play-again").addEventListener("click", () => {
            this.reset();
          });
          document.querySelector("#generate-with-text").addEventListener("click", () => {
            console.log("generate with text button pressed");
            console.log("is it picking up the emotion text?: ", document.querySelector("#emotion-text").value);
            this.generateMoodReferencingLibrary(document.querySelector("#emotion-text").value, (res) => {
              this.displayMood();
              this.displayPlayAgainButton();
            });
          });
        }
        generateMood(emotion) {
          this.moodModel.setMood(emotion);
        }
        generateMoodReferencingLibrary(emotion, cb) {
          this.moodModel.setMoodReferencingLibrary(emotion, cb);
        }
        randomiseMood() {
          this.moodModel.setRandomMood();
        }
        displayMood() {
          this.removeEmotionSelection();
          let moodTextDisplayEl = document.createElement("h3");
          moodTextDisplayEl.innerText = `You are feeling ${this.moodModel.getMood()}`;
          moodTextDisplayEl.classList.add("mood-display");
          let moodDisplayEl = document.createElement("img");
          moodDisplayEl.classList.add("mood-display");
          moodDisplayEl.alt = `${this.moodModel.getMood()} face`;
          moodDisplayEl.id = `${this.moodModel.getMood()}-img`;
          moodDisplayEl.src = `static/images/${this.moodModel.getMood()}-full.jpg`;
          document.querySelector("#mood-result-container").append(moodTextDisplayEl);
          document.querySelector("#mood-result-container").append(moodDisplayEl);
        }
        displayPlayAgainButton() {
          document.querySelector("#play-again").hidden = false;
        }
        removeEmotionSelection() {
          const emotionSelectionEls = document.querySelectorAll(".emotion-selection");
          emotionSelectionEls.forEach((element) => {
            element.hidden = true;
          });
        }
        reset() {
          document.querySelector(".emotion-selection").hidden = false;
          document.querySelectorAll(".mood-display").forEach((element) => {
            element.remove();
          });
          document.querySelector("#play-again").hidden = true;
        }
      };
      module.exports = View2;
    }
  });

  // index.js
  var MoodModel = require_MoodModel();
  var View = require_View();
  var model = new MoodModel();
  var view = new View(model);
})();
