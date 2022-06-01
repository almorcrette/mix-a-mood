/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const View = require('./View.js')

const mockedHappyMoodModel = {}

mockedHappyMoodModel.setMood = jest.fn().mockReturnValue("setMood has been called")
mockedHappyMoodModel.getMood = jest.fn().mockReturnValue('happy')

const mockedSadMoodModel = {}

mockedSadMoodModel.setMood = jest.fn().mockReturnValue("setMood has been called")
mockedSadMoodModel.getMood = jest.fn().mockReturnValue('sad')


describe('View', () => {
  describe('.generateMood', () => {

    it("is called when 'Generate' submit button is clicked", () => {
    })

    describe("calls setMood on the moodModel using as emotion parameter the selected radio button", () => {
      it("calls with parameter 'happy' when 'happy' radio button selected", () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        const view = new View(mockedHappyMoodModel);
        const happySelectorEl = document.querySelector('#happy');
        happySelectorEl.checked = true;
        const generateButtonEl = document.querySelector('#generate');        
        generateButtonEl.click();
        expect(view.moodModel.setMood).toHaveBeenCalledWith("happy");
      })
      it("calls with parameter 'sad' when 'sad' radio button selected", () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        const view = new View(mockedHappyMoodModel);
        const sadSelectorEl = document.querySelector('#sad');
        sadSelectorEl.checked = true;
        const generateButtonEl = document.querySelector('#generate');
        generateButtonEl.click();
        expect(view.moodModel.setMood).toHaveBeenCalledWith("sad");
      })
      it("calls with parameter 'tired' when 'tired' radio button selected", () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML')
        const view = new View(mockedHappyMoodModel);
        const tiredSelectorEl = document.querySelector('#tired');
        tiredSelectorEl.checked = true;
        const generateButtonEl = document.querySelector('#generate');
        generateButtonEl.click();
        expect(view.moodModel.setMood).toHaveBeenCalledWith("tired");
      })
    })
  })

  it("no mood-display when 'Generate' not yet clicked", () => {
    document.body.innerHTML = fs.readFileSync('./index.HTML')
    expect(document.querySelector('.mood-display')).toBe(null)
  })

  describe(".displayMood", () => {

    it("is called when 'Generate' button is clicked", () => {
      document.body.innerHTML = fs.readFileSync('./index.HTML');
      const view = new View(mockedHappyMoodModel);
      const happySelectorEl = document.querySelector('#happy');
      happySelectorEl.checked = true;
      const generateButtonEl = document.querySelector('#generate');
      generateButtonEl.click();
      expect(document.querySelectorAll('img.mood-display').length).toBe(1);   
    })

    describe("displays the mood stored in the moodModel", () => {
      it('e.g. happy mood', () => {
        document.body.innerHTML = fs.readFileSync('./index.HTML');
        const view = new View(mockedHappyMoodModel);
        view.displayMood();
        expect(document.querySelectorAll('img.mood-display').length).toBe(1);
        expect(document.querySelector('img.mood-display').alt).toEqual('happy face');
        expect(document.querySelector('img.mood-display').id).toEqual('happy-img');
        expect(document.querySelector('img.mood-display').src).toEqual('http://localhost/assets/happy-full.jpg');
      })
      it('e.g. sad mood', () => {      
        document.body.innerHTML = fs.readFileSync('./index.HTML');
        const view = new View(mockedSadMoodModel);
        view.displayMood();
        expect(document.querySelectorAll('img.mood-display').length).toBe(1);
        expect(document.querySelector('img.mood-display').alt).toEqual('sad face');
        expect(document.querySelector('img.mood-display').id).toEqual('sad-img');
        expect(document.querySelector('img.mood-display').src).toEqual('http://localhost/assets/sad-full.jpg');

      })
    })

    it('removes emotion selection once a mood is generated', () => {
      document.body.innerHTML = fs.readFileSync('./index.HTML');
      const view = new View(mockedHappyMoodModel);
      const happySelectorEl = document.querySelector('#happy');
      happySelectorEl.checked = true;
      const generateButtonEl = document.querySelector('#generate');
      generateButtonEl.click();
      expect(document.querySelectorAll('.emotion-selection').length).toBe(0)
    })

    it('removes generate button once a mood is generated', () => {
      document.body.innerHTML = fs.readFileSync('./index.HTML');
      const view = new View(mockedHappyMoodModel);
      const happySelectorEl = document.querySelector('#happy');
      happySelectorEl.checked = true;
      const generateButtonEl = document.querySelector('#generate');
      generateButtonEl.click();
      expect(document.querySelectorAll('#generate').length).toBe(0)
    })
  })
})