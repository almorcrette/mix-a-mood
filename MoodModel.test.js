const MoodModel = require('./MoodModel')

const mockedThesaurusApi = {};

mockedThesaurusApi.findSimilarTo = jest.fn()
mockedThesaurusApi.findSimilarTo.mockReturnValue({
  "word": "exhausted",
  "similarTo": [
    "tired",
    "drained"
  ]
})

mockedThesaurusApi.isSimilarTo = jest.fn()
mockedThesaurusApi.isSimilarTo.mockReturnValue(["tired", "drained"])

const moodModel = new MoodModel(mockedThesaurusApi);

describe('MoodModel', () => {
  describe('.prototype', () => {
    // describe('.setMood', () =>{
    //   it("sets the mood to emotion (e.g. 'dummy-mood') passed as parameter", () => {
    //     moodModel.setMood('dummy-mood');
    //     expect(moodModel.mood).toEqual('dummy-mood');
    //   });
    //   it("sets the mood to emotion (e.g. 'another-dummy-mood') passed as parameter", () => {
    //     moodModel.setMood('another-dummy-mood');
    //     expect(moodModel.mood).toEqual('another-dummy-mood');
    //   });
    // });
    describe('.getMood', () => {
      it("returns the model's mood variable (e.g. 'dummy-mood')", () => {
        moodModel.mood = 'dummy-mood';
        expect(moodModel.getMood()).toEqual('dummy-mood');
      });
      it("returns the model's mood variable (e.g. 'another-dummy-mood'", () => {
        moodModel.mood = 'another-dummy-mood';
        expect(moodModel.getMood()).toEqual('another-dummy-mood');
      });
    });
    describe('.setRandomMood', () => {
      it('sets the mood to a random emotion from the emotion libary', () => {
        moodModel.setRandomMood((res) => {
          expect(moodModel.getMood()).not.toBe(null);
        });
      })
    })
    describe('.processUserEmotion', () => {
      describe('when the emotion passed as parameter IS in the emotion library', () => {
        it('sets the mood to this emotion', () => {
          moodModel.processUserEmotion('happy', (res) => {
            expect(moodModel.getMood()).toEqual('happy');
          });
        });
      });
      describe('when the emotion passed as parameter IS NOT in the emotion library', () => {
        describe('searches the thesaurus for a similar word that is in the emotion library', () => {
          describe('if it finds a thesaurus match in the emotion library', () => {
            it('sets the mood to the thesaurus-library match', () => {
              moodModel.processUserEmotion('exhausted', (res) => {
                expect(moodModel.getMood()).toEqual('tired')
              });
              expect(mockedThesaurusApi.isSimilarTo).toHaveBeenCalled();
            });
          });
          describe('if it does NOT find a thesaurus match in the emotion library', () => {

          });
        });
      });
    });
  });
});
