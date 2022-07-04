class Expression {
  constructor(name) {
    this.name = name;
    this.similarTo = []
  }

  getName() {
    return this.name;
  }

  getImgSrc() {
    return `static/images/${this.name}.png`
  }

  addSimilarTo(emotion) {
    return this.similarTo.push(emotion);
  }

  isSimilarTo(emotion) {
    let boolean = false;
    this.similarTo.forEach((similarWord) => {
      if (emotion === similarWord) {
        boolean = true;
        return
      }
    })
    return boolean
  }
}

module.exports = Expression;