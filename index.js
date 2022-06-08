const MoodModel = require('./MoodModel')
const HomeViewModel = require('./HomeViewModel.js');

const model = new MoodModel();
const homeView = new HomeViewModel(model);