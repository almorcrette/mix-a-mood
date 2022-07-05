const Mood = require('./Mood');

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
mockHappyExpression.addSimilarTo = jest.fn()

const mockedLibrary = {};
mockedLibrary.selectRandomExpression = jest.fn().mockReturnValue(mockHappyExpression)
mockedLibrary.isExpression = jest.fn().mockReturnValueOnce(true).mockReturnValue(false);
mockedLibrary.retrieveExpression = jest.fn();
mockedLibrary.retrieveExpression.mockReturnValue(mockTiredExpression).mockReturnValueOnce(mockHappyExpression);
mockedLibrary.firstMatchToExpression = jest.fn();
mockedLibrary.hasSimilarExpression = jest.fn().mockReturnValueOnce(true).mockReturnValue(false)
mockedLibrary.retrieveSimilarExpression = jest.fn().mockReturnValue(mockHappyExpression)

const mood = new Mood(mockedEmotionsApi, mockedLibrary);

describe('Mood', () => {

  describe('.prototype', () => {

    describe('.getMoodExpression', () => {
      it("returns mood's expression", () => {
        mood._setMoodExpression(mockHappyExpression);
        expect(mood.getMoodExpression()).toEqual(mockHappyExpression);
      });
      it("returns the model's mood variable (e.g. 'another-dummy-mood'", () => {
        mood._setMoodExpression(mockSadExpression);
        expect(mood.getMoodExpression()).toEqual(mockSadExpression);
      });
    });

    describe('.setRandomMood', () => {
      it('sets the mood to a random emotion from the emotion libary', () => {
        mood.setRandomMood((res) => {
          expect(mood.getMoodExpression()).not.toBe(null);
        });
      })
    })

    describe('.processUserEmotion', () => {
      describe('when the emotion passed as parameter IS in the emotion library', () => {
        it('sets the moodName to this emotion', () => {
          mockedLibrary.isExpression.mockReturnValueOnce(true)
          mood.clearConsole();
          mood._setMoodExpression(mockHappyExpression);
          mood.processUserEmotion('happy', (updatedMood) => {
            expect(mood.getMoodExpression().getName()).toEqual('happy');
            expect(mood.getMood()).toEqual('happy');
            // expect(mood.getConsole()).toEqual([
            //   'user input: happy',
            //   'input in lower case: happy',
            //   'match with an expression in the library? true',
            //   'using the expression from the library'
            // ])
          });
        });
      });

      describe('when the emotion passed as parameter IS NOT in the emotion library', () => {
        describe('searches the similar words of each expression in the emotion library for a match', () => {
          describe('if it finds a match from similar words of each expression in the emotion library', () => {
            describe('sets the moodName expression to the expression with the match', () => {
              it('calls this.expressionLibrary.retrieveSimilarExpression(emotion)', () => {
                mood.processUserEmotion('bright', () => {
                  expect(mockedLibrary.retrieveSimilarExpression).toHaveBeenCalledWith('bright');
                  expect(mood.getMoodExpression().getName()).toEqual('happy');
                  expect(mood.getMood()).toEqual('bright');
                })
              })
            })
          })
          describe('if it finds no match from similar words of each expression in the library', () => {
            describe('searches the thesaurus for a similar word that is in the emotion library', () => {
              describe('if it finds a thesaurus match in the emotion library', () => {
                it('sets the moodName expression to the thesaurus-library match', () => {
                  mood.processUserEmotion('exhausted', (res) => {
                    expect(mood.getMoodExpression().getName()).toEqual('tired'); // doesn't work because it doesn't generate a response
                    expect(mood.getMood()).toEqual('exhausted'); // doesn't work because it doesn't generate a response
                    expect(updatedMood.getConsole()).toEqual([
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
                it('sets the moodName and moodName expression to undefined', () => {
                  mood.processUserEmotion('not-an-emotion', (res) => {
                    console.log('callback for processUserEmotion with not-an-emotion. res: ', res);
                    expect(mood.getMoodExpression().getName()).toEqual(null); // doesn't work because it doesn't generate a response
                    expect(mood.getMood()).toEqual(undefined); // doesn't work because it doesn't generate a response
                    expect(updatedMood.getConsole()).toEqual([
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
          mood.addMessageToConsole('user input: exhausted');
          expect(mood.getConsole()[mood.console.length - 1]).toEqual('user input: exhausted');
        });
        it("adds 'matching library expression?: false' to console array when passed it as parameter", () => {
          mood.addMessageToConsole('matching library expression?: false');
          expect(mood.getConsole()[mood.console.length - 1]).toEqual('matching library expression?: false');
        });
        it("adds 'Searching the thesaurus...' to console array when passed it as parameter", () => {
          mood.addMessageToConsole('Searching the thesaurus...');
          expect(mood.getConsole()[mood.console.length - 1]).toEqual('Searching the thesaurus...');
        });
        it('keeps previous entries in the console when a new one is added', () => {
          mood.console = [];
          mood.addMessageToConsole('user input: exhausted');
          mood.addMessageToConsole('matching library expression?: false');
          mood.addMessageToConsole('Searching the thesaurus...');
          expect(mood.console.length).toEqual(3);
        });
      });
    });

    describe('.clearConsole', () => {
      it("empties the model's console", () => {
        mood.console = [];
          mood.addMessageToConsole('user input: exhausted');
          mood.addMessageToConsole('matching library expression?: false');
          mood.addMessageToConsole('Searching the thesaurus...');
          mood.clearConsole();
          expect(mood.console.length).toEqual(0);
      });
    });

    describe('._useSimilarMoodFromLibrary', () => {
      it('calls this.expressionLibrary.retrieveSimilarExpression(emotion)', () => {
        mood._useSimilarMoodFromLibrary('bright', () => {
          expect(mockedLibrary.retrieveSimilarExpression).toHaveBeenCalledWith('bright')
        })
      })
      it('sets the return value to the moodExpression', () => {
        mood._useSimilarMoodFromLibrary('bright', () => {
          expect(mood.getMoodExpression().getName()).toEqual('happy')
        })
      })
      it('sets the moodName to the passed emotion', () => {
        mood._useSimilarMoodFromLibrary('bright', () => {
          expect(mood.getMood()).toEqual('bright')
        })
      })
    })

    describe('._cacheThesaurusFind', () => {
      it('takes an expression and an emotion as arguments and calls addSimilarTo on expression emotion (lower case) as argument', () => {
        mood._cacheThesaurusFind(mockHappyExpression, 'EmOtIoN')
        expect(mockHappyExpression.addSimilarTo).toHaveBeenCalledWith('emotion')
      })
    })
  });
});


