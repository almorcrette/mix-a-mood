class MoodLibraryModel {
  constructor(...args) {
    this.coreExpressions = args; 
  }
  selectRandomMood() {
    return this.coreExpressions[Math.floor(Math.random()*this.coreExpressions.length)]
  }

}

module.exports = MoodLibraryModel;