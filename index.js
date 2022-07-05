const Expression = require('./expression');
const Library = require('./library')
const EmotionsApi = require('./emotionsapi');
const Mood = require('./mood')
const View = require('./view.js');

const library = new Library(
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

const emotionsApi = new EmotionsApi();

const model = new Mood(emotionsApi, library);

const view = new View(model);