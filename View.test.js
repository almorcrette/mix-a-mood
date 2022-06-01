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
        const emotionSubmitEl = document.querySelector('#emotion-submit');
        emotionSubmitEl.click();
        expect(view.moodModel.setMood).toHaveBeenCalledWith("happy");
      })
      it("calls with parameter 'sad' when 'sad' radio button selected", () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        const view = new View(mockedMoodModel);
        const sadSelectorEl = document.querySelector('#sad');
        sadSelectorEl.checked = true;
        const emotionSubmitEl = document.querySelector('#emotion-submit');
        emotionSubmitEl.click();
        expect(view.moodModel.setMood).toHaveBeenCalledWith("sad");
      })
      it("calls with parameter 'tired' when 'tired' radio button selected", () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        const view = new View(mockedMoodModel);
        const tiredSelectorEl = document.querySelector('#tired');
        tiredSelectorEl.checked = true;
        const emotionSubmitEl = document.querySelector('#emotion-submit');
        emotionSubmitEl.click();
        expect(view.moodModel.setMood).toHaveBeenCalledWith("tired");
      })
    })
  })

  it("no mood-display when 'Generate' not yet clicked", () => {
    document.body.innerHTML = fs.readFileSync('./index.HTML')
    expect(document.querySelector('.mood-display')).toBe(null)
  })

  describe(".displayMood", () => {

    it("is called when 'Generate' submit button is clicked", () => {
      // document.body.innerHTML = fs.readFileSync('./index.HTML')
      // const happySelectorEl = document.querySelector('#happy');
      // happySelectorEl.checked = true;
      // const emotionSubmitEl = document.querySelector('#emotion-submit');
      // emotionSubmitEl.click();
      // console.log(`document.querySelectorAll('div.mood-display'): `, document.querySelectorAll('div.mood-display'))
    })

    it("displays the mood stored in the moodModel", () => {
        const view = new View(mockedMoodModel);
        view.displayMood();
        expect(document.querySelectorAll('div.mood-display').length).toBe(1);
        expect(document.querySelector('div.mood-display').innerText).toEqual('happy');
      })

      // it("displays happy-img when 'happy' radio button selected and 'Generate' clicked", () => {
      //   document.body.innerHTML = fs.readFileSync('./index.HTML')
      //   const view = new View(mockedMoodModel);
      //   const happySelectorEl = document.querySelector('#happy');
      //   happySelectorEl.checked = true;
      //   const emotionSubmitEl = document.querySelector('#emotion-submit');
      //   emotionSubmitEl.click();
      //   expect(document.querySelector('.mood-display').id).toEqual('happy-img');
      // })


  })
})