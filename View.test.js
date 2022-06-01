/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const View = require('./View.js')

const mockedMoodModel = {}

mockedMoodModel.setMood = jest.fn().mockReturnValue("setMood has been called")
mockedMoodModel.getMood = jest.fn().mockReturnValue('happy')


describe('View', () => {
  describe('.generateMood', () => {

    it("is called when 'Generate' submit button is clicked", () => {
    })

    describe("calls setMood on the moodModel using as emotion parameter the selected radio button", () => {
      it("calls with parameter 'happy' when 'happy' radio button selected", () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        const view = new View(mockedMoodModel);
        const happySelectorEl = document.querySelector('#happy');
        happySelectorEl.checked = true;
        const generateButtonEl = document.querySelector('#generate');
        
        console.log("I am about to click on the button in a passing test")
        generateButtonEl.click();
        console.log("I have clicked on the button in a passing test")

        expect(view.moodModel.setMood).toHaveBeenCalledWith("happy");
      })
      it("calls with parameter 'sad' when 'sad' radio button selected", () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        const view = new View(mockedMoodModel);
        const sadSelectorEl = document.querySelector('#sad');
        sadSelectorEl.checked = true;
        const generateButtonEl = document.querySelector('#generate');
        
        console.log("I am about to click on the button in a passing test")
        generateButtonEl.click();
        console.log("I have clicked on the button in a passing test")

        expect(view.moodModel.setMood).toHaveBeenCalledWith("sad");
      })
      it("calls with parameter 'tired' when 'tired' radio button selected", () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        const view = new View(mockedMoodModel);
        const tiredSelectorEl = document.querySelector('#tired');
        tiredSelectorEl.checked = true;
        const generateButtonEl = document.querySelector('#generate');

        console.log("I am about to click on the button in a passing test")
        generateButtonEl.click();
        console.log("I have clicked on the button in a passing test")

        expect(view.moodModel.setMood).toHaveBeenCalledWith("tired");
      })
    })
  })

  it("no mood-display when 'Generate' not yet clicked", () => {
    document.body.innerHTML = fs.readFileSync('./index.HTML')
    expect(document.querySelector('.mood-display')).toBe(null)
  })

  describe(".displayMood", () => {

    it("displays the mood stored in the moodModel", () => {
      const view = new View(mockedMoodModel);
      view.displayMood();
      expect(document.querySelectorAll('div.mood-display').length).toBe(1);
      expect(document.querySelector('div.mood-display').innerText).toEqual('happy');
    })

    it("is called when 'Generate' button is clicked", () => {
      document.body.innerHTML = fs.readFileSync('./index.HTML');
      const view = new View(mockedMoodModel);
      const happySelectorEl = document.querySelector('#happy');
      happySelectorEl.checked = true;
      const generateButtonEl = document.querySelector('#generate');
      console.log(`generate button: `, generateButtonEl)
      
      console.log("I am about to click on the button in the failing test")
      generateButtonEl.click();
      console.log("I should have clicked the button in the failing test")

      // console.log(`document.querySelectorAll('div.mood-display'): `, document.querySelectorAll('div.mood-display'))
      expect(document.querySelectorAll('div.mood-display').length).toBe(1);
      expect(document.querySelector('div.mood-display').innerText).toEqual('happy');
    })



      // it("displays happy-img when 'happy' radio button selected and 'Generate' clicked", () => {
      //   document.body.innerHTML = fs.readFileSync('./index.HTML')
      //   const view = new View(mockedMoodModel);
      //   const happySelectorEl = document.querySelector('#happy');
      //   happySelectorEl.checked = true;
      //   const generateButtonEl = document.querySelector('#generate');
      //   generateButtonEl.click();
      //   expect(document.querySelector('.mood-display').id).toEqual('happy-img');
      // })


  })
})