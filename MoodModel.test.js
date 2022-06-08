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
    describe('.setMood', () =>{
      it("sets the mood to emotion (e.g. 'dummy-mood') passed as parameter", () => {
        moodModel.setMood('dummy-mood');
        expect(moodModel.mood).toEqual('dummy-mood');
      });
      it("sets the mood to emotion (e.g. 'another-dummy-mood') passed as parameter", () => {
        moodModel.setMood('another-dummy-mood');
        expect(moodModel.mood).toEqual('another-dummy-mood');
      });
    });
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
  });

  describe('.setMoodReferencingLibrary', () => {
    describe('if emotion passed as parameter is a mood in the moodLibrary', () => {
      describe('sets the mood to the emotion passed as paramater', () => {
        it('sets mood to happy when happy is passed as parameter', () => {
          model.setMoodReferencingLibrary('happy', () => { return model.mood });
          expect(model.getMood()).toEqual('happy');
        });
        it('sets mood to happy when sad is passed as parameter', () => {
          model.setMoodReferencingLibrary('sad', () => { return model.mood });
          expect(model.getMood()).toEqual('sad');
        });
      });
    });
    describe('if emotion passed as parameter is not a mood in the moodLibrary', () => {
      describe('looks up similar words using thesaurus for one in the moodLibrary', () => {
        it('calls .findSimilarTo on the thesaurusApi', () => {
          model.setMoodReferencingLibrary('exhausted');
          expect(mockedThesaurusApi.isSimilarTo).toHaveBeenCalled(); // ideally test with parameter 'exhausted'
        })

        // this test fails because it doesn't wait for .setMoodReferencingLibrary to complete
        describe('if finds a similar word that is in the moodLibrary, sets that as the mood', () => {
          it("sets mood to 'tired' when 'exhausted' is passed as parameter", () => {
            model.setMoodReferencingLibrary('exhausted', (res) => {
              expect(setTimeout(model.getMood())).toEqual('tired')
            })
          })
        })
      })
    })
  });
  describe('.setRandomMood', () => {
    it('sets the mood to one of the stored emotions', () => {
      model.setMood();
      model.setRandomMood();
      expect(model.emotions).toContain(model.getMood());
    })
  })
});