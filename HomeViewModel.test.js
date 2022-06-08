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
      it('displays the mood image in the view', () => {
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
