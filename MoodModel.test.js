const MoodModel = require('./MoodModel');

const mockedEmotionsApi = {};
mockedEmotionsApi.fetchSimilarWords = jest.fn()
mockedEmotionsApi.fetchSimilarWords.mockReturnValue([]).mockReturnValueOnce(["tired", "drained"])

const mockHappyExpression = {};
mockHappyExpression.getName = jest.fn();
mockHappyExpression.getName.mockReturnValue('happy');
const mockSadExpression = {};
const mockTiredExpression = {};
mockTiredExpression.getName = jest.fn();
mockTiredExpression.getName.mockReturnValue('tired')

const mockedExpressionsLibrary = {};
mockedExpressionsLibrary.selectRandomExpression = jest.fn().mockReturnValue(mockHappyExpression)
mockedExpressionsLibrary.isExpression = jest.fn();
mockedExpressionsLibrary.isExpression.mockReturnValueOnce(true).mockReturnValue(false);
mockedExpressionsLibrary.retrieveExpression = jest.fn();
mockedExpressionsLibrary.retrieveExpression.mockReturnValue(mockTiredExpression).mockReturnValueOnce(mockHappyExpression);
mockedExpressionsLibrary.firstMatchToExpression = jest.fn();
mockedExpressionsLibrary.hasSimilarExpression = jest.fn().mockReturnValueOnce(true).mockReturnValue(false)
mockedExpressionsLibrary.retrieveSimilarExpression = jest.fn().mockReturnValue(mockHappyExpression)

const moodModel = new MoodModel(mockedEmotionsApi, mockedExpressionsLibrary);

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
          moodModel.processUserEmotion('happy', (updatedMoodModel) => {
            console.log('do I reach here?'); // does not work
            expect(moodModel.getMoodExpression().getName()).toEqual('happy');
            expect(moodModel.getMood()).toEqual('happy');
            expect(updatedMoodModel.getConsole()).toEqual([
              'user input: happy',
              'input in lower case: happy',
              'match with an expression in the library? true',
              'using the expression from the library'
            ])
          });

        });
      });

      describe('when the emotion passed as parameter IS NOT in the emotion library', () => {
        describe('searches the similar words of each expression in the emotion library for a match', () => {
          describe('if it finds a match from similar words of each expression in the emotion library', () => {
            describe('sets the mood expression to the expression with the match', () => {
              it('calls this.expressionLibrary.retrieveSimilarExpression(emotion)', () => {
                moodModel.processUserEmotion('bright', () => {
                  expect(mockedExpressionsLibrary.retrieveSimilarExpression).toHaveBeenCalledWith('bright');
                  expect(moodModel.getMoodExpression().getName()).toEqual('happy');
                  expect(moodModel.getMood()).toEqual('bright');
                })
              })
            })
          })
          describe('if it finds no match from similar words of each expression in the library', () => {
            describe('searches the thesaurus for a similar word that is in the emotion library', () => {
              describe('if it finds a thesaurus match in the emotion library', () => {
                it('sets the mood expression to the thesaurus-library match', () => {
                  moodModel.processUserEmotion('exhausted', (res) => {
                    expect(moodModel.getMoodExpression().getName()).toEqual('tired'); // doesn't work because it doesn't generate a response
                    expect(moodModel.getMood()).toEqual('exhausted'); // doesn't work because it doesn't generate a response
                    expect(updatedMoodModel.getConsole()).toEqual([
                      'user input: exhausted',
                      'input in lower case: exhausted',
                      'match with an expression in the library? false',
                      'searching the thesaurus...',
                      `similar words found: ["tired", "drained"]`,
                      'looking for match with expressions in library...',
                      
                    ])
                  });
                  expect(mockedEmotionsApi.fetchSimilarWords).toHaveBeenCalledWith(
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
                    expect(updatedMoodModel.getConsole()).toEqual([
                      'user input: not-an-emotion',
                      'input in lower case: not-an-emotion',
                      'match with an expression in the library? false',
                      'searching the thesaurus...',
                      `no similar words found`,
                    ])
                  });
                  expect(mockedEmotionsApi.fetchSimilarWords).toHaveBeenCalledWith(
                    'not-an-emotion',
                    expect.anything()
                  );
                });
              });
            });
          });
        });
      })
    })



        

    describe('.addMessageToConsole', () => {
      describe("adds parameter to model's console array", () => {
        it("adds 'user input: exhausted' to console array when passed it as parameter", () => {
          moodModel.addMessageToConsole('user input: exhausted');
          expect(moodModel.getConsole()[moodModel.console.length - 1]).toEqual('user input: exhausted');
        });
        it("adds 'matching library expression?: false' to console array when passed it as parameter", () => {
          moodModel.addMessageToConsole('matching library expression?: false');
          expect(moodModel.getConsole()[moodModel.console.length - 1]).toEqual('matching library expression?: false');
        });
        it("adds 'Searching the thesaurus...' to console array when passed it as parameter", () => {
          moodModel.addMessageToConsole('Searching the thesaurus...');
          expect(moodModel.getConsole()[moodModel.console.length - 1]).toEqual('Searching the thesaurus...');
        });
        it('keeps previous entries in the console when a new one is added', () => {
          moodModel.console = [];
          moodModel.addMessageToConsole('user input: exhausted');
          moodModel.addMessageToConsole('matching library expression?: false');
          moodModel.addMessageToConsole('Searching the thesaurus...');
          expect(moodModel.console.length).toEqual(3);
        });
      });
    });

    describe('.clearConsole', () => {
      it("empties the model's console", () => {
        moodModel.console = [];
          moodModel.addMessageToConsole('user input: exhausted');
          moodModel.addMessageToConsole('matching library expression?: false');
          moodModel.addMessageToConsole('Searching the thesaurus...');
          moodModel.clearConsole();
          expect(moodModel.console.length).toEqual(0);
      });
    });

    describe('._useSimilarMoodFromLibrary', () => {
      it('calls this.expressionLibrary.retrieveSimilarExpression(emotion)', () => {
        moodModel._useSimilarMoodFromLibrary('bright', () => {
          expect(mockedExpressionsLibrary.retrieveSimilarExpression).toHaveBeenCalledWith('bright')
        })
      })
      it('sets the return value to the moodExpression', () => {
        moodModel._useSimilarMoodFromLibrary('bright', () => {
          expect(moodModel.getMoodExpression().getName()).toEqual('happy')
        })
      })
      it('sets the mood to the passed emotion', () => {
        moodModel._useSimilarMoodFromLibrary('bright', () => {
          expect(moodModel.getMood()).toEqual('bright')
        })
      })
    })
  });
});
