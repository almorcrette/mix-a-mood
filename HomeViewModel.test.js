/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const HomeViewModel = require('./HomeViewModel.js')

const mockedMoodModel = {};
mockedMoodModel.getMood = jest.fn().mockReturnValue('dummy-mood');


describe('HomeViewModel', () => {
  describe('.prototype', () => {
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
      it('displays the mood image', () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        homeView = new HomeViewModel(mockedMoodModel);
        homeView.displayMood();
        expect(document.querySelector("img.mood-display").alt).toEqual('dummy-mood face');
        expect(document.querySelector("img.mood-display").id).toEqual('dummy-mood-img');
        expect(document.querySelector("img.mood-display").src).toEqual('http://localhost/static/images/dummy-mood-full.jpg');
      });
      it('displays the mood comment', () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        homeView = new HomeViewModel(mockedMoodModel);
        homeView.displayMood();
        expect(document.querySelector("h3.mood-display").innerText).toEqual('You are feeling dummy-mood');
      });
    });
    describe('.displayPlayAgainButton', () => {
      it("reveals the 'play again' button", () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        homeView = new HomeViewModel(mockedMoodModel);
        const playAgainButtonEl = document.querySelector('button#play-again');
        playAgainButtonEl.hidden = true;
        homeView.displayPlayAgainButton();
        expect(playAgainButtonEl.hidden).toBe(false);

      })
    })
  });
})

// const mockedHappyMoodModel = {}

// mockedHappyMoodModel.setMood = jest.fn().mockReturnValue("setMood has been called")
// mockedHappyMoodModel.getMood = jest.fn().mockReturnValue('happy')
// mockedHappyMoodModel.setRandomMood = jest.fn();
// mockedHappyMoodModel.setMoodReferencingLibrary = jest.fn()


// const mockedSadMoodModel = {}

// mockedSadMoodModel.setMood = jest.fn().mockReturnValue("setMood has been called")
// mockedSadMoodModel.getMood = jest.fn().mockReturnValue('sad')
// mockedSadMoodModel.setMoodReferencingLibrary = jest.fn()



// describe('View', () => {
//   describe('.generateMood', () => {

//     describe("calls setMood on the moodModel using as emotion parameter the selected radio button", () => {
//       it("calls with parameter 'happy' when 'happy' radio button selected", () => {
//         document.body.innerHTML = fs.readFileSync('./index.HTML')
//         const view = new View(mockedHappyMoodModel);
//         const happySelectorEl = document.querySelector('#happy');
//         happySelectorEl.checked = true;
//         const generateButtonEl = document.querySelector('#generate');        
//         generateButtonEl.click();
//         expect(view.moodModel.setMood).toHaveBeenCalledWith("happy");
//       })
//       it("calls with parameter 'sad' when 'sad' radio button selected", () => {
//         document.body.innerHTML = fs.readFileSync('./index.HTML')
//         const view = new View(mockedHappyMoodModel);
//         const sadSelectorEl = document.querySelector('#sad');
//         sadSelectorEl.checked = true;
//         const generateButtonEl = document.querySelector('#generate');
//         generateButtonEl.click();
//         expect(view.moodModel.setMood).toHaveBeenCalledWith("sad");
//       })
//       it("calls with parameter 'tired' when 'tired' radio button selected", () => {
//         document.body.innerHTML = fs.readFileSync('./index.HTML')
//         const view = new View(mockedHappyMoodModel);
//         const tiredSelectorEl = document.querySelector('#tired');
//         tiredSelectorEl.checked = true;
//         const generateButtonEl = document.querySelector('#generate');
//         generateButtonEl.click();
//         expect(view.moodModel.setMood).toHaveBeenCalledWith("tired");
//       })
//     })
//   })

//   describe(".displayMood", () => {

//     describe("displays the mood stored in the moodModel", () => {
//       it('e.g. happy mood', () => {
//         document.body.innerHTML = fs.readFileSync('./index.HTML');
//         const view = new View(mockedHappyMoodModel);
//         view.displayMood();
//         expect(document.querySelectorAll('img.mood-display').length).toBe(1);
//         expect(document.querySelector('img.mood-display').alt).toEqual('happy face');
//         expect(document.querySelector('img.mood-display').id).toEqual('happy-img');
//         expect(document.querySelector('img.mood-display').src).toEqual('http://localhost/static/images/happy-full.jpg');
//       })
//       it('e.g. sad mood', () => {      
//         document.body.innerHTML = fs.readFileSync('./index.HTML');
//         const view = new View(mockedSadMoodModel);
//         view.displayMood();
//         expect(document.querySelectorAll('img.mood-display').length).toBe(1);
//         expect(document.querySelector('img.mood-display').alt).toEqual('sad face');
//         expect(document.querySelector('img.mood-display').id).toEqual('sad-img');
//         expect(document.querySelector('img.mood-display').src).toEqual('http://localhost/static/images/sad-full.jpg');

//       })
//     })

//     it('hides emotion selection and generate button once a mood is generated', () => {
//       document.body.innerHTML = fs.readFileSync('./index.HTML');
//       const view = new View(mockedHappyMoodModel);
//       const happySelectorEl = document.querySelector('#happy');
//       happySelectorEl.checked = true;
//       const generateButtonEl = document.querySelector('#generate');
//       generateButtonEl.click();
//       expect(document.querySelectorAll('.emotion-selection').forEach((element) => {
//         element.hidden == true;
//       }))
//     })

//     describe("displays text 'You are feeling [mood]'", () => {
//       it("e.g. 'You are feeling happy", () => {
//         document.body.innerHTML = fs.readFileSync('./index.HTML');
//         const view = new View(mockedHappyMoodModel);
//         const happySelectorEl = document.querySelector('#happy');
//         happySelectorEl.checked = true;
//         const generateButtonEl = document.querySelector('#generate');
//         generateButtonEl.click();
//         expect(document.querySelector('h3.mood-display').innerText).toEqual('You are feeling happy') 
//       })
//       it("e.g. 'You are feeling sad", () => {
//         document.body.innerHTML = fs.readFileSync('./index.HTML');
//         const view = new View(mockedSadMoodModel);
//         const sadSelectorEl = document.querySelector('#sad');
//         sadSelectorEl.checked = true;
//         const generateButtonEl = document.querySelector('#generate');
//         generateButtonEl.click();
//         expect(document.querySelector('h3.mood-display').innerText).toEqual('You are feeling sad') 
//       })

//     })
//   })

//   describe("Play again", () => {
//     describe(".reset", () => {
//       it("resets to the start screen to play again", () => {
//         document.body.innerHTML = fs.readFileSync('./index.HTML');
//         const view = new View(mockedHappyMoodModel);
//         view.displayMood();
//         view.reset();
//         expect(document.querySelectorAll('.emotion-selection').length).not.toBe(0)
//         expect(document.querySelectorAll('#generate').length).toBe(1)
//         expect(document.querySelectorAll('img.mood-display').length).toBe(0);
//       })
//     })

//     describe("'Play again' button", () => {
//       it("is hidden before mood is generated", () => {
//         document.body.innerHTML = fs.readFileSync('./index.HTML');
//         const view = new View(mockedHappyMoodModel);
//         expect(document.querySelector('#play-again').hidden).toBe(true)
//       })
//       it("'Play again' button appears once a mood is generated", () => {
//         document.body.innerHTML = fs.readFileSync('./index.HTML');
//         const view = new View(mockedHappyMoodModel);
//         const sadSelectorEl = document.querySelector('#sad');
//         sadSelectorEl.checked = true;
//         const generateButtonEl = document.querySelector('#generate');
//         generateButtonEl.click();
//         expect(document.querySelector('#play-again').hidden).toBe(false)
//       })
//       it("resets to the start screen when clicked", () => {
//         document.body.innerHTML = fs.readFileSync('./index.HTML');
//         const view = new View(mockedHappyMoodModel);
//         const sadSelectorEl = document.querySelector('#sad');
//         sadSelectorEl.checked = true;
//         const generateButtonEl = document.querySelector('#generate');
//         generateButtonEl.click();
//         document.querySelector('#play-again').click();
//         expect(document.querySelectorAll('.emotion-selection').length).not.toBe(0)
//         expect(document.querySelectorAll('#generate').length).toBe(1)
//         expect(document.querySelectorAll('img.mood-display').length).toBe(0);
//       })
//     })
//   })

//   describe("Randomise", () => {
//     describe(".randomiseMood", () => {
//       it("calls setRandomMood on moodModel", () => {
//         const view = new View(mockedHappyMoodModel);
//         view.randomiseMood();
//         expect(view.moodModel.setRandomMood).toHaveBeenCalled();
//       })
//     })
//     describe("'Randomise' button", () => {
//       it("is visible on the start screen", () => {
//         document.body.innerHTML = fs.readFileSync('./index.HTML');
//         const view = new View(mockedHappyMoodModel);
//         expect(document.querySelectorAll('button#randomise').length).toBe(1)
//         expect(document.querySelector('button#randomise').textContent).toBe('Randomise')
//       })
//       it("randomises a mood and displays it when clicked", () => {
//         document.body.innerHTML = fs.readFileSync('./index.HTML');
//         const view = new View(mockedHappyMoodModel);
//         document.querySelector('button#randomise').click();
//         expect(document.querySelectorAll('img.mood-display').length).toBe(1);   
//         expect(document.querySelectorAll('h3.mood-display').length).toBe(1);
//         expect(document.querySelector('#play-again').hidden).toBe(false)
//       })
//     })


//   })
//   describe('.generateMoodFromText', () => {

//     it("is called when 'Generate from text' submit button is clicked", () => {
//     })

//     describe("calls setMood on the moodModel using as emotion parameter the text in the text box", () => {
//       it("calls with parameter 'happy' when 'happy' is typed into the text box", () => {
//         jest.resetAllMocks();
//         document.body.innerHTML = fs.readFileSync('./index.HTML')
//         const view = new View(mockedHappyMoodModel);
//         const textBoxEl = document.querySelector('#emotion-input');
//         textBoxEl.value = 'happy';
//         const generateWithTextButtonEl = document.querySelector('#generate');        
//         generateWithTextButtonEl.click();
//         expect(view.moodModel.setMoodReferencingLibrary).toHaveBeenCalledWith("happy");
//       })
//       it("calls with parameter 'sad' when 'sad' radio button selected", () => {
//         jest.resetAllMocks();
//         document.body.innerHTML = fs.readFileSync('./index.HTML')
//         const view = new View(mockedSadMoodModel);
//         const textBoxEl = document.querySelector('#emotion-input');
//         textBoxEl.value = 'sad';
//         const generateWithTextButtonEl = document.querySelector('#generate');        
//         generateWithTextButtonEl.click();
//         expect(view.moodModel.setMoodReferencingLibrary).toHaveBeenCalledWith("sad");
//       })
//     })
//   })
// })