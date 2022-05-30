const MoodModel = require('./MoodModel')

class View {
  constructor(moodModel = new MoodModel) {
    this.moodModel = moodModel

    this.emotionSelectorEls = [
      document.querySelector('#happy'),
      document.querySelector('#sad')
    ]
    this.emotionSubmitEl = document.querySelector("#emotion-submit")
    

    this.emotionSubmitEl.addEventListener('click', () => {
      this.emotionSelectorEls.forEach((emotion) => {
        if (emotion.checked == true) {
          this.generateMood(emotion.value);
        }
      })
    })

  }

  generateMood(emotion) {
    this.moodModel.setMood(emotion)
  }
}

module.exports = View;