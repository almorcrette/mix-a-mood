const Mood = require('./mood')

class View {
  constructor(mood = new Mood) {
    this.mood = mood;

    this.dialogueContainerEl = document.querySelector("#dialogue-container");
    this.expressionContainerEl = document.querySelector("#expression-container");

    this.emotionSelectionEls = document.querySelectorAll('.emotion-selection');

    this.emotionInputEl = document.querySelector('input#emotion-input');
    this.generateButtonEl = document.querySelector("button#generate");
    this.randomiseButtonEl = document.querySelector('button#randomise');
    this.playAgainButtonEl = document.querySelector('button#play-again');

    this.generateButtonEl.addEventListener('click', () => {
      this.mood.processUserEmotion(this.emotionInputEl.value,
        (res) => {
          this.hideEmotionSelection();
          if (this.mood.getMood() === undefined) {
            this.displayNotFound();
          } else {
            this.displayMood();
          }
          this.displayPlayAgainButton();
          this.displayConsole();
        }
      ); 
    })
    this.randomiseButtonEl.addEventListener('click', () => {
      this.mood.setRandomMood(
        (res) => {
          this.hideEmotionSelection();
          this.displayMood();
          this.displayPlayAgainButton();
          this.displayConsole();
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
    moodDisplayEl.alt = `${this.mood.getMoodExpression().getName()} face`;
    moodDisplayEl.id = `${this.mood.getMoodExpression().getName()}-img`;
    moodDisplayEl.src = this.mood.getMoodExpression().getImgSrc();
    this.expressionContainerEl.append(moodDisplayEl);
  }

  _displayMoodComment() {
    let moodTextDisplayEl = document.createElement('h3');
    moodTextDisplayEl.innerText = `You are feeling ${this.mood.getMood()}`;
    moodTextDisplayEl.classList.add('mood-display');
    document.querySelector("#mood-dialogue-result-container").append(moodTextDisplayEl);
  }

  displayConsole() {
    this.mood.getConsole().forEach((message) => {
      let consoleMessageEl = document.createElement('li');
      consoleMessageEl.classList.add('console-message')
      consoleMessageEl.innerText = message;
      document.querySelector('#console-list').append(consoleMessageEl);
    })
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
    document.querySelectorAll('.console-message').forEach((message) => {
      message.remove();
    });
    this.mood.clearConsole();
    this.emotionSelectionEls.forEach((element) => {
      element.hidden = false;
    });
    this.emotionInputEl.value = null;
    document.querySelectorAll('.mood-display').forEach((element) => {
      element.remove();
    });
    document.querySelector('#play-again').hidden = true;
    document.querySelector('#prototype-expression').hidden = false;
  }
}

module.exports = View;