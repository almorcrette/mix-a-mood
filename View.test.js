/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const View = require('./View.js')

const mockedMoodModel = {}

mockedMoodModel.setMood = jest.fn().mockReturnValue("setMood has been called")


describe('View', () => {
  describe('generateMood', () => {
    it('calls the .setMood method on the mood model with the emotion parameter', () => {
      document.body.innerHTML = fs.readFileSync('./index.HTML')
      const view = new View(mockedMoodModel);
      const emotionSelectorEl = document.querySelector('#happy');
      emotionSelectorEl.checked = true;
      const emotionSubmitEl = document.querySelector('#emotion-submit');
      emotionSubmitEl.click();
      expect(view.moodModel.setMood).toHaveBeenCalledWith("happy");
    })
  })
})