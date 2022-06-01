class MoodModel {
  constructor() {
  }

  setMood(emotion) {
    console.log(`emotion param in setMood: `, emotion)
    this.mood = emotion;
  }

  getMood() {
    return this.mood;
  }
}

module.exports = MoodModel;