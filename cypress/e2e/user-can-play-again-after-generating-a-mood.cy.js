describe('Homepage', () => {
  describe('User can play again after generating a mood', () => {
    describe("User generates a mood and then clicks play again", () => {
      beforeEach(() => {
        cy.visit('/')


        cy.get('[id="emotion-input"]')
          .type('happy')
        cy.get('[id="generate"]').click()

        cy.get('#play-again').click()
      });
      it('Emotion selection UI reappears', () => {
        cy.get('#emotion-selection-container')
        .should('be.visible')
      });
      it('Previous mood result disappears', () => {
        cy.get('.mood-display')
          .should('not.exist')
      });
      it("User can generate a different mood", () => {
        cy.get('[id="emotion-input"]')
          .type('sad')
        cy.get('[id="generate"]').click()

        cy.get('#emotion-selection-container')
        .should('not.be.visible')
        cy.get('img.mood-display')
          .should('have.attr', 'src', 'static/images/sad.png')
        cy.get('h3.mood-display')
          .should('contain', 'You are feeling sad')
        cy.get('#play-again')
          .should('be.visible')
      });
    });
  });
});