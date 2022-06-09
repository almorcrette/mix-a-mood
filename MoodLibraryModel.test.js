const MoodLibraryModel = require('./MoodLibraryModel')

const moodLibrary = new MoodLibraryModel('happy', 'sad');

describe('MoodLibraryModel', () => {
  describe('.prototype', () => {
    describe('.attemptUserLibraryMatch', () => {

    })
    describe('.setMoodToUserThesaurusLibraryMatch', () => {
      // describe('searches the thesaurus for similar words to the parameter emotion that is in the emotion library')

    })
    describe('.selectRandomMood', () => {
      describe('returns a random mood from the core expressions', () => {
        it("returns 'happy' sometimes if this is a core expression", () => {
          const moodLibrary = new MoodLibraryModel('happy');
          expect(moodLibrary.coreExpressions).toContain(moodLibrary.selectRandomMood());
        })
        it("returns 'sad' sometimes if this is a core expression", () => {
          const moodLibrary = new MoodLibraryModel('sad');
          expect(moodLibrary.coreExpressions).toContain(moodLibrary.selectRandomMood());
        })

      })

    })
    describe('.matchInLibrary', () => {
      describe('passes an array of words, returns first word matching a core expression in the library', () => {
        it("returns 'happy' when passed ['happy'] if 'happy' is a core expression", () => {
          const moodLibrary = new MoodLibraryModel('happy');
          expect(moodLibrary.matchInLibrary(['happy'])).toEqual('happy');
        })
        it("returns 'sad' when passed ['sad'] if 'sad' is a core expression", () => {
          const moodLibrary = new MoodLibraryModel('sad');
          expect(moodLibrary.matchInLibrary(['sad'])).toEqual('sad');
        })
        it("returns 'sad' when passed ['depressed', 'sad'] if 'sad' is a core expression but not 'depressed'", () => {
          const moodLibrary = new MoodLibraryModel('sad');
          expect(moodLibrary.matchInLibrary(['depressed', 'sad'])).toEqual('sad');
        })
      })
    })
  })
})