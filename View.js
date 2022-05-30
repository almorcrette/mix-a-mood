const MoodModel = require('./MoodModel')

class View {
  constructor(moodModel = new MoodModel) {
    this.moodModel = moodModel

    this.emotionSelectorEl = document.querySelector('#happy')
    this.emotionSubmitEl = document.querySelector("#emotion-submit")
    

    this.emotionSubmitEl.addEventListener('click', () => {
      if (this.emotionSelectorEl.checked == true) {
      this.generateMood(this.emotionSelectorEl.value);
      }
    })

  }

  generateMood(emotion) {
    this.moodModel.setMood(emotion)
  }
}

module.exports = View;