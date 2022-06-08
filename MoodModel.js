const ThesaurusApi = require('./ThesaurusApi');

class MoodModel {
  constructor(thesaurusApi = new ThesaurusApi()) {
    this.thesaurusApi = thesaurusApi;
    this.emotionLibrary = ["happy", "sad", "curious", "tired"];
    this.mood = null;
  }

  getMood() {
    return this.mood;
  }

  setRandomMood(cb) {
    cb(this._setMood(this._selectRandomMood()))
  }

  processUserEmotion(emotion, cb) {
    this.mood = null;
    this.emotionLibrary.some((mood) => {
      this._setMoodToUserLibraryMatch(emotion)
      // if (emotion === mood) {
      //   this._setMood(emotion);
      //   return this.mood;
      // }
    })
    if (this.mood != null) {
      cb();
      return this.mood
    } else {
      this._attemptUserThesaurusLibraryMatch(emotion, cb)
      // this.thesaurusApi.isSimilarTo(emotion, (data) => {
      //   cb(this._setMood(this._matchInLibrary(data)))
      // })
    }
  }

  _setMoodToUserLibraryMatch(emotion) {
    this.emotionLibrary.some((mood) => {
      if (emotion === mood) {
        this._setMood(emotion);
        return this.mood;
      }
    })
  }

  _attemptUserThesaurusLibraryMatch(emotion, cb) {
    this.thesaurusApi.isSimilarTo(emotion, (data) => {
      cb(this._setMood(this._matchInLibrary(data)))
    })
  }

  _selectRandomMood() {
    return this.emotionLibrary[Math.floor(Math.random()*this.emotionLibrary.length)]
  }

  _matchInLibrary(data) {
    let wordMatch = null;
    data.some((similarWord) => {
      this.emotionLibrary.some((libraryWord) => {
        if (libraryWord === similarWord) {
          wordMatch = libraryWord;
        };
        return wordMatch != null;
      })
      return wordMatch != null;
    })
    return wordMatch
  }

  _setMood(emotion) {
    return this.mood = emotion;
  }

}

module.exports = MoodModel;