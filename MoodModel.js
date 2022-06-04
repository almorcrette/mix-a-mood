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
        return;
      }
    })
    if (this.mood != null) {
      return
    } else {
      this.thesaurusApi.findSimilarTo(
        emotion,
        (data) => { return this.mood = this.matchInLibrary(data, this._moodLibrary) },
        (err) => {console.log(err)}
      )
    }
  }

  getMood() {
    return this.mood;
  }

  get emotions() {
    return this._moodLibrary;
  }

  matchInLibrary(data) {
    let wordMatch = null;
    data.similarTo.some((similarWord) => {
      this._moodLibrary.some((libraryWord) => {
        if (libraryWord === similarWord) {
          wordMatch = libraryWord;
        };
        return wordMatch != null;
      })
      return wordMatch != null;
    })
    return wordMatch
  }

}

module.exports = MoodModel;