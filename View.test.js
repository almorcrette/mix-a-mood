/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const View = require('./View.js')

describe('View', () => {
  describe('.generateMood', () => {
    it('calls the .setMood method on the mood model with the emotion parameter', () => {
      document.body.innerHTML = fs.readFileSync('./index.HTML')
      const view = new View();
      const emotionSelectorEl = document.querySelector('#emotion-selector-input');
      emotionSelectorEl.select = "happy";
      const emotionSubmitEl = document.querySelector('emotion-submit');
      emotionSubmitEl.click();
      expect(view.moodModel.setMood).toHaveBeenCalledWith("happy");
    })
  })

})