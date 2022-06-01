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
    this.moodResultContainerEl = document.querySelector("#mood-result-container")
    

    this.emotionSubmitEl.addEventListener('click', () => {
      this.emotionSelectorEls.forEach((emotion) => {
        if (emotion.checked == true) {
          this.generateMood(emotion.value);
        }
        console.log(`this.moodModel.getMood(): `, this.moodModel.getMood())
      })
      
    })

  }

  generateMood(emotion) {
    this.moodModel.setMood(emotion);
    // this._displayMood();
    
  }

  displayMood() {
    let moodDisplayEl = document.createElement('div');
    moodDisplayEl.classList.add('mood-display');
    moodDisplayEl.innerText = `${this.moodModel.getMood()}`;
    // moodDisplayEl.id = `${this.moodModel.getMood()}-img`;
    console.log(`moodDisplayEl: `, moodDisplayEl)
    console.log(`this.moodResultContainerEl: `, this.moodResultContainerEl)
    this.moodResultContainerEl.append(moodDisplayEl);
  }
}

module.exports = View;