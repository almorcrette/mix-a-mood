class EmotionsApi {
  constructor() {
    
  }

  fetchSimilarWords(emotion, cb) {
    const url = `/emotions/${emotion}`;
    const options = {
      method: 'GET'
    };
    fetch(url, options)
      .then(res => {
        return res.json();
      })
      .then(similarWords => {
        cb(similarWords)
      })
  }

}

module.exports = EmotionsApi;