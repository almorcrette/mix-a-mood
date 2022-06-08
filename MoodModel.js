const ThesaurusApi = require('./ThesaurusApi');

class MoodModel {
  constructor(thesaurusApi = new ThesaurusApi()) {
    this.thesaurusApi = thesaurusApi;
    this._moodLibrary = ["happy", "sad", "curious", "tired"];
    this.mood = null;
  }

  setMood(emotion) {
    this.mood = emotion;
  }

  getMood() {
    return this.mood;
  }

  setRandomMood(cb) {
    this.mood = this._moodLibrary[Math.floor(Math.random()*this._moodLibrary.length)];
    cb();
  }

  processUserEmotion(emotion, cb) {
    this.mood = null;
    this._moodLibrary.some((mood) => {
      if (emotion === mood) {
        this.mood = emotion;
        return this.mood;
      }
    })
    if (this.mood != null) {
      cb();
      return this.mood
    } else {
      this.thesaurusApi.isSimilarTo(emotion, (data) => {
        cb(this.setMood(this.matchInLibrary(data)))
      })
    }
  }



  get emotions() {
    return this._moodLibrary;
  }

  matchInLibrary(data) {
    let wordMatch = null;
    data.some((similarWord) => {
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