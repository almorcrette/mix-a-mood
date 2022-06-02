(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // MoodModel.js
  var require_MoodModel = __commonJS({
    "MoodModel.js"(exports, module) {
      var MoodModel2 = class {
        constructor() {
          this._emotions = ["happy", "sad"];
        }
        setMood(emotion) {
          this.mood = emotion;
        }
        setRandomMood() {
          this.mood = this._emotions[Math.floor(Math.random() * this._emotions.length)];
        }
        getMood() {
          return this.mood;
        }
        get emotions() {
          return this._emotions;
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
        }
        generateMood(emotion) {
          this.moodModel.setMood(emotion);
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
          moodDisplayEl.src = `./assets/${this.moodModel.getMood()}-full.jpg`;
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
