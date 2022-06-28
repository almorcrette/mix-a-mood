const MoodModel = require('./MoodModel')

class HomeViewModel {
  constructor(moodModel = new MoodModel) {
    this.moodModel = moodModel;

    this.dialogueContainerEl = document.querySelector("#dialogue-container");
    this.expressionContainerEl = document.querySelector("#expression-container");

    this.emotionSelectionEls = document.querySelectorAll('.emotion-selection');

    this.emotionInputEl = document.querySelector('input#emotion-input');
    this.generateButtonEl = document.querySelector("button#generate");
    this.randomiseButtonEl = document.querySelector('button#randomise');
    this.playAgainButtonEl = document.querySelector('button#play-again');

    this.generateButtonEl.addEventListener('click', () => {
      this.moodModel.processUserEmotion(this.emotionInputEl.value,
        (res) => {
          this.hideEmotionSelection();
          if (this.moodModel.getMood() === undefined) {
            this.displayNotFound();
          } else {
            this.displayMood();
          }
          this.displayPlayAgainButton();
        }
      ); 
    })
    this.randomiseButtonEl.addEventListener('click', () => {
      this.moodModel.setRandomMood(
        (res) => {
          this.hideEmotionSelection();
          this.displayMood();
          this.displayPlayAgainButton();
        }
      );
    })
    this.playAgainButtonEl.addEventListener('click', () => {
      this.resetDisplay();
    })
  }

  hideEmotionSelection() {
    this.emotionSelectionEls.forEach((element) => {
      element.hidden = true;
    })
  }

  displayMood() {
    document.querySelector('#prototype-expression').hidden = true;
    this._displayMoodImage();
    this._displayMoodComment();
  }

  _displayMoodImage() {
    let moodDisplayEl = document.createElement('img');
    moodDisplayEl.classList.add('mood-display');
    moodDisplayEl.alt = `${this.moodModel.getMoodExpression().getName()} face`;
    moodDisplayEl.id = `${this.moodModel.getMoodExpression().getName()}-img`;
    moodDisplayEl.src = this.moodModel.getMoodExpression().getImgSrc();
    this.expressionContainerEl.append(moodDisplayEl);
  }

  _displayMoodComment() {
    let moodTextDisplayEl = document.createElement('h3');
    moodTextDisplayEl.innerText = `You are feeling ${this.moodModel.getMood()}`;
    moodTextDisplayEl.classList.add('mood-display');
    document.querySelector("#mood-dialogue-result-container").append(moodTextDisplayEl);
  }

  displayNotFound() {
    document.querySelector('#prototype-expression').hidden = true;
    let moodDisplayEl = document.createElement('img');
    moodDisplayEl.classList.add('mood-display');
    moodDisplayEl.alt = `mood not found`;
    moodDisplayEl.id = `not-found-img`;
    moodDisplayEl.src = `static/images/not-found.png`;
    this.expressionContainerEl.append(moodDisplayEl);
    let moodTextDisplayEl = document.createElement('h3');
    moodTextDisplayEl.innerText = `I don't recognise that mood`;
    moodTextDisplayEl.classList.add('mood-display');
    document.querySelector("#mood-dialogue-result-container").append(moodTextDisplayEl);
  }

  displayPlayAgainButton() {
    this.playAgainButtonEl.hidden = false;
  }

  resetDisplay() {
    this.emotionSelectionEls.forEach((element) => {
      element.hidden = false;
    })
    this.emotionInputEl.value = null;
    document.querySelectorAll('.mood-display').forEach((element) => {
      element.remove();
    });
    document.querySelector('#play-again').hidden = true;
    document.querySelector('#prototype-expression').hidden = false;
  }
}

module.exports = HomeViewModel;