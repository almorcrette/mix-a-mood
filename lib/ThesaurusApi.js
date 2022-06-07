const ENV = require('./.env');

class ThesaurusApi {

  isSimilarTo(word, callback) {
    this.findSimilarTo(word, (data) => { callback(data.similarTo) }, this.standardErrorCB)
  }

  findSimilarTo(word, successCB, errorCB) {
    const url = `https://wordsapiv1.p.rapidapi.com/words/${word}/similarTo`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
        'X-RapidAPI-Key': ENV.X_RAPIDAPI_KEY
      }
    };
    fetch(url, options)
      .then(res => res.json())
      .then(json => successCB(json))
      .catch(err => errorCB(err))
  }

  standardErrorCB(err) {
    console.log('error:' + err);
  }
}

module.exports = ThesaurusApi; 