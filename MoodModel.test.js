const MoodModel = require('./MoodModel');

const mockedThesaurusApi = {};
mockedThesaurusApi.isSimilarTo = jest.fn()
mockedThesaurusApi.isSimilarTo.mockReturnValue(["tired", "drained"])

const mockHappyExpression = {};
mockHappyExpression.getName = jest.fn();
mockHappyExpression.getName.mockReturnValue('happy')
const mockSadExpression = {};

const mockedExpressionsLibrary = {};
mockedExpressionsLibrary.selectRandomExpression = jest.fn();
mockedExpressionsLibrary.isExpression = jest.fn();
mockedExpressionsLibrary.isExpression.mockReturnValueOnce(true).mockReturnValue(false);
mockedExpressionsLibrary.retrieveExpression = jest.fn();
mockedExpressionsLibrary.retrieveExpression.mockReturnValue(mockHappyExpression)
mockedExpressionsLibrary.firstMatchToExpression = jest.fn();

const moodModel = new MoodModel(mockedThesaurusApi, mockedExpressionsLibrary);

describe('MoodModel', () => {

  describe('.prototype', () => {

    describe('.getMoodExpression', () => {
      it("returns mood's expression", () => {
        moodModel._setMoodExpression(mockHappyExpression);
        expect(moodModel.getMoodExpression()).toEqual(mockHappyExpression);
      });
      it("returns the model's mood variable (e.g. 'another-dummy-mood'", () => {
        moodModel._setMoodExpression(mockSadExpression);
        expect(moodModel.getMoodExpression()).toEqual(mockSadExpression);
      });
    });

    describe('.setRandomMood', () => {
      it('sets the mood to a random emotion from the emotion libary', () => {
        moodModel.setRandomMood((res) => {
          expect(moodModel.getMoodExpression()).not.toBe(null);
        });
      })
    })

    describe('.processUserEmotion', () => {
      describe('when the emotion passed as parameter IS in the emotion library', () => {
        it('sets the mood to this emotion', () => {
          moodModel._setMoodExpression(mockHappyExpression);
          moodModel.processUserEmotion('happy', (data) => { return data});
          expect(moodModel.getMoodExpression().getName()).toEqual('happy');
        });
      });

      describe('when the emotion passed as parameter IS NOT in the emotion library', () => {
        describe('searches the thesaurus for a similar word that is in the emotion library', () => {
          describe('if it finds a thesaurus match in the emotion library', () => {
            it('sets the mood to the thesaurus-library match', () => {
              moodModel.processUserEmotion('exhausted', (res) => {
                expect(moodModel.getMoodExpression().getName()).toEqual('tired')
              });
              expect(mockedThesaurusApi.isSimilarTo).toHaveBeenCalledWith(
                'exhausted',
                expect.anything()
              );
            });
          });

          describe('if it does NOT find a thesaurus match in the emotion library', () => {

          });
        });
      });
    });
  });
});
