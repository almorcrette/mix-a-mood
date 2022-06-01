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
    })

  }

  generateMood(emotion) {
    this.moodModel.setMood(emotion);
    // this._displayMood();
    
  }

  displayMood() {
    let moodDisplayEl = document.createElement('img');
    moodDisplayEl.classList.add('mood-display');
    moodDisplayEl.alt = `${this.moodModel.getMood()} face`;
    moodDisplayEl.id = `${this.moodModel.getMood()}-img`;
    moodDisplayEl.src = `./assets/${this.moodModel.getMood()}-full.png`;
    document.querySelector("#mood-result-container").append(moodDisplayEl);
  }
}

module.exports = View;