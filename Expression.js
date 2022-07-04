class Expression {
  constructor(name) {
    this.name = name;
    // similarTo attribute
  }

  getName() {
    return this.name;
  }

  getImgSrc() {
    return `static/images/${this.name}.png`
  }

  //getSimilarTo

  //addSimilarTo
}

module.exports = Expression;