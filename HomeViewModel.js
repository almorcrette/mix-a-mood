const MoodModel = require('./MoodModel')

class HomeViewModel {
  constructor(moodModel = new MoodModel) {
    this.moodModel = moodModel;

    this.emotionSelectionContainerEl = document.querySelector('#emotion-selection-container');
    this.moodDisplayContainerEl = document.querySelector("#mood-result-container")

    this.emotionInputEl = document.querySelector('input#emotion-input');
    this.generateButtonEl = document.querySelector("button#generate");
    this.randomiseButtonEl = document.querySelector('button#randomise');
    this.playAgainButtonEl = document.querySelector('button#play-again');

    this.generateButtonEl.addEventListener('click', () => {
      this.moodModel.processUserEmotion(this.emotionInputEl.value,
        (res) => {
          this.hideEmotionSelection();
          this.displayMood();
          this.displayPlayAgainButton();
        }
      ); 
    })
    this.randomiseButtonEl.addEventListener('click', () => {
      this.moodModel.setRandomMood(
        // this.displayResult
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

  // displayResult(res) {
  //   this.hideEmotionSelection();
  //   this.displayMood();
  //   this.displayPlayAgainButton();
  // }

  hideEmotionSelection() {
    this.emotionSelectionContainerEl.hidden = true;
  }

  displayMood() {
    this._displayMoodImage();
    this._displayMoodComment();
  }

  _displayMoodImage() {
    let moodDisplayEl = document.createElement('img');
    moodDisplayEl.classList.add('mood-display');
    moodDisplayEl.alt = `${this.moodModel.getMoodExpression().getName()} face`;
    moodDisplayEl.id = `${this.moodModel.getMoodExpression().getName()}-img`;
    moodDisplayEl.src = this.moodModel.getMoodExpression().getImgSrc();
    this.moodDisplayContainerEl.append(moodDisplayEl);
  }

  _displayMoodComment() {
    let moodTextDisplayEl = document.createElement('h3');
    moodTextDisplayEl.innerText = `You are feeling ${this.moodModel.getMoodExpression().getName()}`;
    moodTextDisplayEl.classList.add('mood-display');
    this.moodDisplayContainerEl.append(moodTextDisplayEl);
  }

  displayPlayAgainButton() {
    this.playAgainButtonEl.hidden = false;
  }

  resetDisplay() {
    this.emotionSelectionContainerEl.hidden = false;
    this.emotionInputEl.value = null;
    document.querySelectorAll('.mood-display').forEach((element) => {
      element.remove();
    });
    document.querySelector('#play-again').hidden = true;
  }
}

module.exports = HomeViewModel;