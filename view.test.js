/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const View = require('./View.js')

const mockExpression = {};
mockExpression.getName = jest.fn().mockReturnValue('dummy-mood');
mockExpression.getImgSrc = jest.fn().mockReturnValue('static/images/dummy-mood.jpg');

const mockedMood = {};
mockedMood.getMoodExpression = jest.fn().mockReturnValue(mockExpression);
mockedMood.getMood = jest.fn().mockReturnValue('user-input-emotion-downcase');
mockedMood.processUserEmotion = jest.fn()
mockedMood.getConsole = jest.fn().mockReturnValue([
  'A first console message',
  'Another console message which is longer than the first one...',
  'A third console message'
])
mockedMood.clearConsole = jest.fn().mockReturnValue([]);


describe('View', () => {
  describe('.prototype', () => {
    describe('variables include', () => {
      describe("event listener for click of 'generate' button", () => {
        it('calls mood to process the user emotion', () => {
          document.body.innerHTML = fs.readFileSync('./index.HTML')
          view = new View(mockedMood);
          view.generateButtonEl = document.querySelector("button#generate");
          view.emotionInputEl = document.querySelector('input#emotion-input');
          view.generateButtonEl.click();
          expect(mockedMood.processUserEmotion).toHaveBeenCalledWith(
            view.emotionInputEl.value,
            expect.anything()
          )
        })
        // it('call backs to hide the emotion selection section, once mood has prcessed user emotion', () => {
        //   document.body.innerHTML = fs.readFileSync('./index.HTML')
        //   view = new View(mockedMood);
        //   view.generateButtonEl = document.querySelector("button#generate");
        //   view.emotionInputEl = document.querySelector('input#emotion-input');
        //   view.generateButtonEl.click();
        // })
      })
    })


    describe('.hideEmotionSelection', () => {
      it('hides the emotion selection section in the view', () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        view = new View(mockedMood);
        const emotionSelectionEls = document.querySelectorAll('.emotion-selection');
        emotionSelectionEls.forEach((element) => {
          element.hidden = false;
        });
        view.hideEmotionSelection();
        emotionSelectionEls.forEach((element) => {
          expect(element.hidden).toBe(true);
        });
      });
    });
    describe('.displayMood', () => {
      it('hides the prototype expression', () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        view = new View(mockedMood);
        view.displayMood();
        expect(document.querySelector("img#prototype-expression").hidden).toBe(true)
      });
      it('displays the mood image in the view', () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        view = new View(mockedMood);
        view.displayMood();
        expect(document.querySelector("img.mood-display").alt).toEqual('dummy-mood face');
        expect(document.querySelector("img.mood-display").id).toEqual('dummy-mood-img');
        expect(document.querySelector("img.mood-display").src).toEqual('http://localhost/static/images/dummy-mood.jpg');
      });
      it('displays the mood comment', () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        view = new View(mockedMood);
        view.displayMood();
        expect(document.querySelector("h3.mood-display").innerText).toEqual('You are feeling user-input-emotion-downcase');
      });
    });
    describe('.displayPlayAgainButton', () => {
      it("reveals the 'play again' button in the view", () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        view = new View(mockedMood);
        const playAgainButtonEl = document.querySelector('button#play-again');
        playAgainButtonEl.hidden = true;
        view.displayPlayAgainButton();
        expect(playAgainButtonEl.hidden).toBe(false);
      })
    })
    describe('.displayConsole', () => {
      it("reveals the console with commentary about the algorithm in the view", () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        view = new View(mockedMood);
        view.displayConsole();
        const consoleMessageEls = document.querySelectorAll('.console-message')
        expect(consoleMessageEls.length).toEqual(3);
      })
    })
    describe('.resetDisplay', () => {
      it('reveals the emotion selection section in the view', () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        view = new View(mockedMood);
        const emotionSelectionEls = document.querySelectorAll('.emotion-selection');
        emotionSelectionEls.forEach((element) => {
          element.hidden = true;
        });
        view.resetDisplay();
        emotionSelectionEls.forEach((element) => {
          expect(element.hidden).toBe(false);
        });
      });
      it('reveals the prototype expression', () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        view = new View(mockedMood);
        document.querySelector("img#prototype-expression").hidden = true;
        view.resetDisplay();
        expect(document.querySelector("img#prototype-expression").hidden).toBe(false);
      })
      it('removes mood display elements from the view', () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        view = new View(mockedMood);
        view.resetDisplay();
        expect(document.querySelectorAll('.mood-display').length).toEqual(0);
      })
      it("hides the 'play again' button in the view", () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        view = new View(mockedMood);
        const playAgainButtonEl = document.querySelector('button#play-again');
        playAgainButtonEl.hidden = false;
        view.resetDisplay();
        expect(playAgainButtonEl.hidden).toBe(true);
      });
      describe("clears the console", () => {
        it('calls clearConsole on mood', () => {
          mockedMood.clearConsole.mockReset();
          document.body.innerHTML = fs.readFileSync('./index.HTML')
          view = new View(mockedMood);
          view.resetDisplay();
          expect(view.mood.clearConsole).toHaveBeenCalledTimes(1);
        })
        it('removes displayed console messages', () => {
          document.body.innerHTML = fs.readFileSync('./index.HTML')
        view = new View(mockedMood);
        view.displayConsole();
        view.resetDisplay();
        const consoleMessageEls = document.querySelectorAll('.console-message')
        expect(consoleMessageEls.length).toEqual(0);
        })

      })
    })
  });
})
