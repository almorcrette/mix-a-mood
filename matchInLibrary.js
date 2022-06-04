const ThesaurusApi = require('./ThesaurusApi');

const thesaurusApi = new ThesaurusApi();

const emotionLibrary = ['happy', 'sad', 'curious', 'tired'];

const matchInLibrary = (data) => {
  let wordMatch = null;
  console.log('data: ', data);
  data.similarTo.some((similarWord) => {
    console.log('inside data.similarTo each loop, similarWord: ', similarWord);
    emotionLibrary.some((libraryWord) => {
      console.log('inside emotionLibrary each loop, libraryWord: ', libraryWord);
      if (libraryWord === similarWord) {
        console.log('we have a match');
        wordMatch = libraryWord;
      } else {
        console.log('no match');
      }
      return wordMatch != null;
    })
    return wordMatch != null;
  })
  console.log('wordMatch: ', wordMatch);
}

const errorCB = (err) => {console.error('error:' + err)};

console.log(thesaurusApi.findSimilarTo('inquisitive', matchInLibrary, errorCB));