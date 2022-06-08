const MoodLibraryModel = require('./MoodLibraryModel')

const moodLibrary = new MoodLibraryModel('happy', 'sad');

describe('MoodLibraryModel', () => {
  describe('.prototype', () => {
    describe('.attemptUserLibraryMatch', () => {

    })
    describe('.setMoodToUserThesaurusLibraryMatch', () => {

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

    })
  })
})