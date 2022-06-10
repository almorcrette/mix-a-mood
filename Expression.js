class Expression {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  getImgSrc() {
    return `static/images/${this.name}.png`
  }
}

module.exports = Expression;