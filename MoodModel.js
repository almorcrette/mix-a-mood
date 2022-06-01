class MoodModel {
  constructor() {
  }

  setMood(emotion) {
    this.mood = emotion;
  }

  getMood() {
    return this.mood;
  }
}

module.exports = MoodModel;