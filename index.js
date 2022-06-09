const Expression = require('./Expression');
const ExpressionsLibrary = require('./ExpressionsLibrary')
const ThesaurusApi = require('./ThesaurusApi');
const MoodModel = require('./MoodModel')
const HomeViewModel = require('./HomeViewModel.js');

const expressionsLibrary = new ExpressionsLibrary(
  new Expression('happy'),
  new Expression('sad'),
  new Expression('tired')
)

const thesaurusApi = new ThesaurusApi();

const model = new MoodModel(thesaurusApi, expressionsLibrary);

const homeView = new HomeViewModel(model);