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
          console.log(`emotion.value: `, emotion.value)
          this.generateMood(emotion.value);
        }
      })
      let moodDisplayEl = document.createElement('img');
      moodDisplayEl.classList.add('mood-display')
      console.log(`this.moodModel.getMood: `, this.moodModel.getMood)
      moodDisplayEl.id = `${this.moodModel.getMood()}-img`
      this.moodResultEl.append(moodDisplayEl)
    })

  }

  generateMood(emotion) {
    console.log(`emotion param in generateMood: `, emotion)
    this.moodModel.setMood(emotion);
  }
}

module.exports = View;