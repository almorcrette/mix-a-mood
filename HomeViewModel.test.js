/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const HomeViewModel = require('./HomeViewModel.js')

const mockExpression = {};
mockExpression.getName = jest.fn().mockReturnValue('dummy-mood');
mockExpression.getImgSrc = jest.fn().mockReturnValue('static/images/dummy-mood.jpg');

const mockedMoodModel = {};
mockedMoodModel.getMoodExpression = jest.fn().mockReturnValue(mockExpression);
mockedMoodModel.processUserEmotion = jest.fn()


describe('HomeViewModel', () => {
  describe('.prototype', () => {
    describe('variables include', () => {
      describe("event listener for click of 'generate' button", () => {
        it('calls moodModel to process the user emotion', () => {
          document.body.innerHTML = fs.readFileSync('./index.HTML')
          homeView = new HomeViewModel(mockedMoodModel);
          homeView.generateButtonEl = document.querySelector("button#generate");
          homeView.emotionInputEl = document.querySelector('input#emotion-input');
          homeView.generateButtonEl.click();
          expect(mockedMoodModel.processUserEmotion).toHaveBeenCalledWith(
            homeView.emotionInputEl.value,
            expect.anything()
          )
        })
        // it('call backs to hide the emotion selection section, once moodModel has prcessed user emotion', () => {
        //   document.body.innerHTML = fs.readFileSync('./index.HTML')
        //   homeView = new HomeViewModel(mockedMoodModel);
        //   homeView.generateButtonEl = document.querySelector("button#generate");
        //   homeView.emotionInputEl = document.querySelector('input#emotion-input');
        //   homeView.generateButtonEl.click();
        // })
      })
    })


    describe('.hideEmotionSelection', () => {
      it('hides the emotion selection section in the view', () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        homeView = new HomeViewModel(mockedMoodModel);
        const emotionSelectionContainerEl = document.querySelector('#emotion-selection-container');
        emotionSelectionContainerEl.hidden = false;
        homeView.hideEmotionSelection();
        expect(emotionSelectionContainerEl.hidden).toBe(true);
      });
    });
    describe('.displayMood', () => {
      it('displays the mood image in the view', () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        homeView = new HomeViewModel(mockedMoodModel);
        homeView.displayMood();
        expect(document.querySelector("img.mood-display").alt).toEqual('dummy-mood face');
        expect(document.querySelector("img.mood-display").id).toEqual('dummy-mood-img');
        expect(document.querySelector("img.mood-display").src).toEqual('http://localhost/static/images/dummy-mood.jpg');
      });
      it('displays the mood comment', () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        homeView = new HomeViewModel(mockedMoodModel);
        homeView.displayMood();
        expect(document.querySelector("h3.mood-display").innerText).toEqual('You are feeling dummy-mood');
      });
    });
    describe('.displayPlayAgainButton', () => {
      it("reveals the 'play again' button in the view", () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        homeView = new HomeViewModel(mockedMoodModel);
        const playAgainButtonEl = document.querySelector('button#play-again');
        playAgainButtonEl.hidden = true;
        homeView.displayPlayAgainButton();
        expect(playAgainButtonEl.hidden).toBe(false);
      })
    })
    describe('.resetDisplay', () => {
      it('reveals the emotion selection section in the view', () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        homeView = new HomeViewModel(mockedMoodModel);
        const emotionSelectionContainerEl = document.querySelector('#emotion-selection-container');
        emotionSelectionContainerEl.hidden = true;
        homeView.resetDisplay();
        expect(emotionSelectionContainerEl.hidden).toBe(false);
      });
      it('removes mood display elements from the view', () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        homeView = new HomeViewModel(mockedMoodModel);
        homeView.resetDisplay();
        expect(document.querySelectorAll('.mood-display').length).toEqual(0);
      })
      it("hides the 'play again' button in the view", () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        homeView = new HomeViewModel(mockedMoodModel);
        const playAgainButtonEl = document.querySelector('button#play-again');
        playAgainButtonEl.hidden = false;
        homeView.resetDisplay();
        expect(playAgainButtonEl.hidden).toBe(true);
      });
    })
  });
})
