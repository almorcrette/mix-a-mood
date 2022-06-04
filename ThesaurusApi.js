require('dotenv').config()

class ThesaurusApi {

  isSimilarTo(word, CB) {
    this.findSimilarTo(word, CB, this.standardErrorCB)
  }

  findSimilarTo(word, successCB, errorCB) {
    const url = `https://wordsapiv1.p.rapidapi.com/words/${word}/similarTo`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY
      }
    };
    fetch(url, options)
      .then(res => res.json())
      .then(json => successCB(json))
      .catch(err => errorCB(err))
  }

  standardSuccessCB(data) {
    console.log('successfully retrieve data including similarTo: ', data.similarTo);
  }

  standardErrorCB(err) {
    console.log('error:' + err);
  }
}

module.exports = ThesaurusApi; 