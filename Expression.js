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
}

module.exports = Expression;