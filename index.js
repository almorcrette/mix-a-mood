const Expression = require('./Expression');
const ExpressionsLibrary = require('./ExpressionsLibrary')
const ThesaurusApi = require('./ThesaurusApi');
const MoodModel = require('./MoodModel')
const HomeViewModel = require('./HomeViewModel.js');

const expressionsLibrary = new ExpressionsLibrary(
  new Expression('happy'),
  new Expression('grateful'),
  new Expression('sad'),
  new Expression('tired'),
  new Expression('excited'),
  new Expression('tearful'),
  new Expression('nervous'),
  new Expression('curious'),
  new Expression('angry'),
  new Expression('amazed'),
  new Expression('surprised'),
  new Expression('enthusiastic'),
  new Expression('bored'),
  new Expression('joyous'),
  new Expression('lustful'),
  new Expression('unimpressed'),
  new Expression('content'),
  new Expression('thoughtful'),
  new Expression('worried'),
  new Expression('disgusted'),
  new Expression('fearful')
)

const thesaurusApi = new ThesaurusApi();

const model = new MoodModel(thesaurusApi, expressionsLibrary);

const homeView = new HomeViewModel(model);