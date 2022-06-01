const MoodModel = require('./MoodModel')

class View {
  constructor(moodModel = new MoodModel) {
    this.moodModel = moodModel

    this.emotionSelectorEls = [
      document.querySelector('#happy'),
      document.querySelector('#sad'),
      document.querySelector('#tired')
    ]
    this.emotionSubmitEl = document.querySelector("#emotion-submit")
    this.moodResultEl = document.querySelector("#mood-result")
    

    this.emotionSubmitEl.addEventListener('click', () => {
      this.emotionSelectorEls.forEach((emotion) => {
        if (emotion.checked == true) {
          this.generateMood(emotion.value);
        }
      })
      
    })

  }

  generateMood(emotion) {
    this.moodModel.setMood(emotion);
    this._displayMood();
    
  }

  _displayMood() {
    let moodDisplayEl = document.createElement('img');
    moodDisplayEl.classList.add('mood-display')
    moodDisplayEl.id = `${this.moodModel.getMood()}-img`
    this.moodResultEl.append(moodDisplayEl)
  }
}

module.exports = View;