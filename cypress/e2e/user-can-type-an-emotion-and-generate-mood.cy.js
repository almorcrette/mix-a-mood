describe('Homepage', () => {
  describe('User can type an emotion and generate a mood', () => {
    describe("User types an emotion and clicks 'generate'", () => {
      describe("in the context where the emotion IS in the built-in emotion library", () => {
        beforeEach(() => {
          cy.visit('/')
  
  
          cy.get('[id="emotion-input"]')
            .type('happy')
          cy.get('[id="generate"]').click()
    
        });
        it('Emotion selection UI disappears', () => {
          cy.get('#emotion-selection-container')
          .should('not.be.visible')
        });
        it('Typed mood is displayed', () => {
          cy.get('img.mood-display')
            .should('have.attr', 'src', 'static/images/happy-full.jpg')
          cy.get('h3.mood-display')
            .should('contain', 'You are feeling happy')
        });
        it("'Play again' button appears", () => {
          cy.get('#play-again')
            .should('be.visible')
        });
      });
      describe("in the context where the emotion IS NOT in the built-in emotion library", () => {
        beforeEach(() => {
          cy.visit('/')
  
  
          cy.get('[id="emotion-input"]')
            .type('exhausted')
          cy.get('[id="generate"]').click()
    
        });
        it('Emotion selection UI disappears', () => {
          cy.get('#emotion-selection-container')
          .should('not.be.visible')
        });
        it('Typed mood is displayed', () => {
          cy.get('img.mood-display')
            .should('have.attr', 'src', 'static/images/tired-full.jpg')
          cy.get('h3.mood-display')
            .should('contain', 'You are feeling tired')
        });
        it("'Play again' button appears", () => {
          cy.get('#play-again')
            .should('be.visible')
        });
      })
    });
  });
});