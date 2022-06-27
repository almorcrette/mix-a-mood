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
mockedMoodModel.getMood = jest.fn().mockReturnValue('user-input-emotion-downcase');
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
        const emotionSelectionEls = document.querySelectorAll('.emotion-selection');
        emotionSelectionEls.forEach((element) => {
          element.hidden = false;
        });
        homeView.hideEmotionSelection();
        emotionSelectionEls.forEach((element) => {
          expect(element.hidden).toBe(true);
        });
      });
    });
    describe('.displayMood', () => {
      it('hides the prototype expression', () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        homeView = new HomeViewModel(mockedMoodModel);
        homeView.displayMood();
        expect(document.querySelector("img#prototype-expression").hidden).toBe(true)
      });
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
        expect(document.querySelector("h3.mood-display").innerText).toEqual('You are feeling user-input-emotion-downcase');
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
        const emotionSelectionEls = document.querySelectorAll('.emotion-selection');
        emotionSelectionEls.forEach((element) => {
          element.hidden = true;
        });
        homeView.resetDisplay();
        emotionSelectionEls.forEach((element) => {
          expect(element.hidden).toBe(false);
        });
      });
      it('reveals the prototype expression', () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        homeView = new HomeViewModel(mockedMoodModel);
        document.querySelector("img#prototype-expression").hidden = true;
        homeView.resetDisplay();
        expect(document.querySelector("img#prototype-expression").hidden).toBe(false);
      })
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
