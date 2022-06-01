/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const View = require('./View.js')

const mockedMoodModel = {}

mockedMoodModel.setMood = jest.fn().mockReturnValue("setMood has been called")


describe('View', () => {
  describe('.generateMood', () => {
    describe("sets the mood to the selected emotion when 'Generate' is clicked", () => {
      it("sets mood to 'happy' when 'happy' radio button selected", () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        const view = new View(mockedMoodModel);
        const happySelectorEl = document.querySelector('#happy');
        happySelectorEl.checked = true;
        const emotionSubmitEl = document.querySelector('#emotion-submit');
        emotionSubmitEl.click();
        expect(view.moodModel.setMood).toHaveBeenCalledWith("happy");
      })

      it("sets mood to 'sad' when 'sad' radio button selected", () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        const view = new View(mockedMoodModel);
        const sadSelectorEl = document.querySelector('#sad');
        sadSelectorEl.checked = true;
        const emotionSubmitEl = document.querySelector('#emotion-submit');
        emotionSubmitEl.click();
        expect(view.moodModel.setMood).toHaveBeenCalledWith("sad");
      })

      it("sets mood to 'tired' when 'tired' radio button selected", () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        const view = new View(mockedMoodModel);
        const tiredSelectorEl = document.querySelector('#tired');
        tiredSelectorEl.checked = true;
        const emotionSubmitEl = document.querySelector('#emotion-submit');
        emotionSubmitEl.click();
        expect(view.moodModel.setMood).toHaveBeenCalledWith("tired");
      })

    })
    describe("displays the mood when 'Generate' is clicked", () => {
      it("no mood-display when 'Generate' not yet clicked", () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        expect(document.querySelector('.mood-display')).toBe(null)
      })
      it("displays happy-img when 'happy' radio button selected and 'Generate' clicked", () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        const view = new View(mockedMoodModel);
        const happySelectorEl = document.querySelector('#happy');
        happySelectorEl.checked = true;
        const emotionSubmitEl = document.querySelector('#emotion-submit');
        emotionSubmitEl.click();
        expect(document.querySelector('.mood-display').id).toEqual('happy-img');
      })
      it("displays sad-img when 'sad' button selected and 'Generate' clicked", () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        const view = new View(mockedMoodModel);
        const sadSelectorEl = document.querySelector('#sad');
        sadSelectorEl.checked = true;
        const emotionSubmitEl = document.querySelector('#emotion-submit');
        emotionSubmitEl.click();
        console.log(`document.querySelector('.mood-display'):`, document.querySelector('.mood-display'))
        console.log(`document.querySelector('.mood-display').id: `, document.querySelector('.mood-display').id)
        expect(document.querySelector('.mood-display').id).toEqual('sad-img');
      })

    })
  })
})