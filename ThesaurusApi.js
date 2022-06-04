require('dotenv').config()

class ThesaurusApi {

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
      .catch(err => errorCB('error:' + err))
  }
}

module.exports = ThesaurusApi; 