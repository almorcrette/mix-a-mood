class MoodModel {
  constructor() {
    this._emotions = ["happy", "sad"];
  }

  setMood(emotion) {
    this.mood = emotion;
  }

  setRandomMood() {
    this.mood = this._emotions[Math.floor(Math.random(0, this._emotions.length))]

  }

  getMood() {
    return this.mood;
  }

  get emotions() {
    return this._emotions;
  }
}

module.exports = MoodModel;