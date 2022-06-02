const MoodModel = require('./MoodModel')

class View {
  constructor(moodModel = new MoodModel) {
    this.moodModel = moodModel

    this.emotionSelectorEls = [
      document.querySelector('#happy'),
      document.querySelector('#sad'),
      document.querySelector('#tired')
    ]
    // this.emotionSubmitEl = document.querySelector("#generate")
    // this.moodResultContainerEl = document.querySelector("#mood-result-container")
    

    document.querySelector("#generate").addEventListener('click', () => {
      this.emotionSelectorEls.forEach((emotion) => {
        if (emotion.checked == true) {
          this.generateMood(emotion.value);
        }
      })
      this.displayMood();
      this.displayPlayAgainButton();
    })

    document.querySelector('#play-again').addEventListener('click', () => {
      this.reset();
    })

  }

  generateMood(emotion) {
    this.moodModel.setMood(emotion);
    
  }

  displayMood() {
    this.removeEmotionSelection();
    let moodDisplayEl = document.createElement('img');
    moodDisplayEl.classList.add('mood-display');
    moodDisplayEl.alt = `${this.moodModel.getMood()} face`;
    moodDisplayEl.id = `${this.moodModel.getMood()}-img`;
    moodDisplayEl.src = `./assets/${this.moodModel.getMood()}-full.jpg`;
    document.querySelector("#mood-result-container").append(moodDisplayEl);
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
    document.querySelector('.mood-display').remove();
    document.querySelector('#play-again').hidden = true;
  }
}

module.exports = View;