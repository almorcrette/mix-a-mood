const { JestEnvironment } = require('@jest/environment');
const MoodModel = require('./MoodModel')

const model = new MoodModel;

describe('MoodModel', () => {
  describe('.getMood', () => {
    it("returns the model's mood variable", () => {
      model.setMood('happy')
      expect(model.getMood()).toEqual('happy')
    })
  })
  describe('.setMood', () =>{
    describe('sets the mood to the emotions passed as parameters', () => {
      it("sets mood to happy when happy is passed as parameter", () => {
        model.setMood('happy')
        expect(model.getMood()).toEqual('happy')
      });
    });
  });
  describe('.setMoodReferencingLibrary', () => {
    describe('if emotion passed as parameter is a mood in the moodLibrary', () => {
      describe('sets the mood to the emotion passed as paramater', () => {
        it('sets mood to happy when happy is passed as parameter', () => {
          model.setMoodReferencingLibrary('happy');
          expect(model.getMood()).toEqual('happy');
        });
        it('sets mood to happy when sad is passed as parameter', () => {
          model.setMoodReferencingLibrary('sad');
          expect(model.getMood()).toEqual('sad');
        });
      });
    });
    // describe('if emotion passed as parameter is not a mood in the moodLibrary', () => {
    //   describe('looks up similar words using thesaurus for one in the moodLibrary', () => {
    //     describe('if finds a similar word that is in the moodLibrary, sets that as the mood', () => {
    //       it("sets mood to 'tired' when 'exhausted' is passed as parameter", () => {
    //         model.setMoodReferencingLibrary('exhausted');
    //         expect(model.getMood()).toEqual('tired');
    //       })
    //     })
    //   })
    // })
  });
  describe('.setRandomMood', () => {
    it('sets the mood to one of the stored emotions', () => {
      model.setMood();
      model.setRandomMood();
      expect(model.emotions).toContain(model.getMood());
    })
  })
});