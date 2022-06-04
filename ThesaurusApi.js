require('dotenv').config()

class ThesaurusApi {

  isSimilarTo(word) {
    this.findSimilarTo(
      word,
      (data) => {
        return data.similarTo;
      }),
      (err) => {
        console.log('error:' + err);
      }
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
}

module.exports = ThesaurusApi; 