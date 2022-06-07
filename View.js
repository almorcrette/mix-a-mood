const MoodModel = require('./MoodModel')

class View {
  constructor(moodModel = new MoodModel) {
    this.moodModel = moodModel;

    this.emotionInputEl = document.querySelector('input#emotion-input');
    this.generateButtonEl = document.querySelector("button#generate");
    this.randomiseButtonEl = document.querySelector('button#randomise');
    this.playAgainButtonEl = document.querySelector('button#play-again');

    this.generateButtonEl.addEventListener('click', () => {
      this.generateMood(
        this.emotionInputEl.value,
        (res) => {
          this.displayMood();
          this.displayPlayAgainButton();
        }
      ); 
    })

    this.randomiseButtonEl.addEventListener('click', () => {
      this.randomiseMood(
        (res) => {
          this.displayMood();
          this.displayPlayAgainButton();
        }
      );
    })

    this.playAgainButtonEl.addEventListener('click', () => {
      this.reset();
    })
  }

  generateMood(emotion, cb) {
    this.moodModel.processUserEmotion(emotion, cb);
  }

  randomiseMood(cb) {
    this.moodModel.setRandomMood(cb);
  }

  displayMood() {
    this.removeEmotionSelection();
    this.displayMoodImage();
    this.displayMoodComment();
  }

  displayMoodImage() {
    let moodDisplayEl = document.createElement('img');
    moodDisplayEl.classList.add('mood-display');
    moodDisplayEl.alt = `${this.moodModel.getMood()} face`;
    moodDisplayEl.id = `${this.moodModel.getMood()}-img`;
    moodDisplayEl.src = `static/images/${this.moodModel.getMood()}-full.jpg`;
    document.querySelector("#mood-result-container").append(moodDisplayEl);
  }

  displayMoodComment() {
    let moodTextDisplayEl = document.createElement('h3');
    moodTextDisplayEl.innerText = `You are feeling ${this.moodModel.getMood()}`;
    moodTextDisplayEl.classList.add('mood-display');
    document.querySelector("#mood-result-container").append(moodTextDisplayEl);
  }

  displayPlayAgainButton() {
    document.querySelector('#play-again').hidden = false;
  }

  removeEmotionSelection() {
    const emotionSelectionEls = document.querySelectorAll('.emotion-selection')
    emotionSelectionEls.forEach((element) => {
      element.hidden = true;
    })
  }

  reset() {
    document.querySelector('.emotion-selection').hidden = false;
    document.querySelectorAll('.mood-display').forEach((element) => {
      element.remove();
    });
    document.querySelector('#play-again').hidden = true;
  }
}

module.exports = View;