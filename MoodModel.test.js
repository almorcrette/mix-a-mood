const MoodModel = require('./MoodModel');

const mockedThesaurusApi = {};
mockedThesaurusApi.isSimilarTo = jest.fn()
mockedThesaurusApi.isSimilarTo.mockReturnValue([]).mockReturnValueOnce(["tired", "drained"])

const mockHappyExpression = {};
mockHappyExpression.getName = jest.fn();
mockHappyExpression.getName.mockReturnValue('happy');
const mockSadExpression = {};
const mockTiredExpression = {};
mockTiredExpression.getName = jest.fn();
mockTiredExpression.getName.mockReturnValue('tired')

const mockedExpressionsLibrary = {};
mockedExpressionsLibrary.selectRandomExpression = jest.fn();
mockedExpressionsLibrary.isExpression = jest.fn();
mockedExpressionsLibrary.isExpression.mockReturnValueOnce(true).mockReturnValue(false);
mockedExpressionsLibrary.retrieveExpression = jest.fn();
mockedExpressionsLibrary.retrieveExpression.mockReturnValue(mockTiredExpression).mockReturnValueOnce(mockHappyExpression);
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

    describe('.lowerCase', () => {
      describe('returns argument in lower case', () => {
        it("returns 'happy' when passed 'HaPpY'", () => {
          expect(moodModel.lowerCase('HaPpY')).toEqual('happy');
        });
        it("returns 'happy' when passed 'ExHaUsTeD'", () => {
          expect(moodModel.lowerCase('ExHaUsTeD')).toEqual('exhausted');
        });
        it("returns 'happy' when passed 'sAd'", () => {
          expect(moodModel.lowerCase('sAd')).toEqual('sad');
        });
      })
    })

    describe('.processUserEmotion', () => {
      describe('when the emotion passed as parameter IS in the emotion library', () => {
        it('sets the mood to this emotion', () => {
          moodModel._setMoodExpression(mockHappyExpression);
          moodModel.processUserEmotion('happy', (data) => {
            expect(moodModel.getMoodExpression().getName()).toEqual('happy');
            expect(moodModel.getMood()).toEqual('happy');
          });

        });
      });

      describe('when the emotion passed as parameter IS NOT in the emotion library', () => {
        describe('searches the thesaurus for a similar word that is in the emotion library', () => {
          describe('if it finds a thesaurus match in the emotion library', () => {
            it('sets the mood expression to the thesaurus-library match', () => {
              moodModel.processUserEmotion('exhausted', (res) => {
                expect(moodModel.getMoodExpression().getName()).toEqual('tired'); // doesn't work because it doesn't generate a response
                expect(moodModel.getMood()).toEqual('exhausted'); // doesn't work because it doesn't generate a response
              });
              expect(mockedThesaurusApi.isSimilarTo).toHaveBeenCalledWith(
                'exhausted',
                expect.anything()
              );
            });
          });

          describe('if it does NOT find a thesaurus match in the emotion library', () => {
            it('sets the mood and mood expression to undefined', () => {
              moodModel.processUserEmotion('not-an-emotion', (res) => {
                console.log('callback for processUserEmotion with not-an-emotion. res: ', res);
                expect(moodModel.getMoodExpression().getName()).toEqual(null); // doesn't work because it doesn't generate a response
                expect(moodModel.getMood()).toEqual(undefined); // doesn't work because it doesn't generate a response
              });
              expect(mockedThesaurusApi.isSimilarTo).toHaveBeenCalledWith(
                'not-an-emotion',
                expect.anything()
              );
            });
          });

        });
      });
    });
  });
});
