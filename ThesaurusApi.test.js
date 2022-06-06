const ThesaurusApi = require('./ThesaurusApi')

require('jest-fetch-mock').enableMocks();

describe('ThesaurusApi', () => {
  describe('.findSimilarTo', () => {
    it('fetches words similar to word passed as argument', () => {
      const thesaurusApi = new ThesaurusApi();
      fetch.mockResponseOnce(JSON.stringify({
        "word": "exhausted",
        "similarTo": [
          "tired",
          "drained"
        ]
      }))
      thesaurusApi.findSimilarTo('exhausted', (res) => {
        expect(res).toEqual({
          "word": "exhausted",
          "similarTo": [
            "tired",
            "drained"
          ]
        })
      })
    })
  })
  describe('.isSimilarTo', () => {
    it('fetches words similar to word passed as argument', () => {
      const thesaurusApi = new ThesaurusApi();
      fetch.mockResponseOnce(JSON.stringify({
        "word": "exhausted",
        "similarTo": [
          "tired",
          "drained"
        ]
      }))
      thesaurusApi.isSimilarTo('exhausted', (res) => {
        expect(res).toEqual([
            "tired",
            "drained"
          ]
        )
      })
    })
  })
})