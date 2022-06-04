const ThesaurusApi = require('./ThesaurusApi');

class MoodModel {
  constructor(thesaurusApi = new ThesaurusApi()) {
    this.thesaurusApi = thesaurusApi;
    this._moodLibrary = ["happy", "sad", "curious", "tired"];
  }

  setMood(emotion) {
    this.mood = emotion;
  }

  setRandomMood() {
    this.mood = this._moodLibrary[Math.floor(Math.random()*this._moodLibrary.length)]
  }

  setMoodReferencingLibrary(emotion) {
    this.mood = null;
    this._moodLibrary.some((mood) => {
      if (emotion === mood) {
        this.mood = emotion;
        return 'emotion matches a mood in the library';
      }
    })
    if (this.mood != null) {
      return
    } else {
      this.mood = this._matchInLibrary(this.thesaurusApi.isSimilarTo(emotion));
    }
  }

  getMood() {
    return this.mood;
  }

  get emotions() {
    return this._moodLibrary;
  }

  _matchInLibrary(data) {
    let wordMatch = null;
    data.some((similarWord) => {
      this._moodLibrary.some((libraryWord) => {
        if (libraryWord === similarWord) {
          wordMatch = libraryWord;
        }
        return wordMatch != null;
      })
      return wordMatch != null;
    })
    return wordMatch;
  }

  errorCB(err) {
    console.error('error:' + err)
  }

}

module.exports = MoodModel;