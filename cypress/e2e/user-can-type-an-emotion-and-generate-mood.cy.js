describe('Homepage', () => {
  describe('User can type an emotion and generate a mood', () => {
    describe("User types an emotion and clicks 'generate'", () => {
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
  });
});