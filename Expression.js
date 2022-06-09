class Expression {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  getImgSrc() {
    return `static/images/${this.name}.jpg`
  }
}

module.exports = Expression;