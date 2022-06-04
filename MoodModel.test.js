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
  describe('.setRandomMood', () => {
    it('sets the mood to one of the stored emotions', () => {
      model.setMood();
      model.setRandomMood();
      expect(model.emotions).toContain(model.getMood());
    })
  })
});