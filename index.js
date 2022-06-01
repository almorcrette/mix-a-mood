const MoodModel = require('./MoodModel')
const View = require('./View.js');

const model = new MoodModel();
const view = new View(model);