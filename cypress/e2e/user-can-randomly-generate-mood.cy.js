describe('Homepage', () => {
  describe('User can randomly generate a mood', () => {
    describe("User clicks 'randomise'", () => {
      beforeEach(() => {
        cy.visit('/')
  
        cy.get('[id="randomise"]').click()
      });
      it('Emotion selection UI disappears', () => {
        cy.get('#emotion-selection-container')
        .should('not.be.visible')
      });
      it('Prototype expression disapears', () => {
        cy.get('#prototype-expression')
          .should('not.be.visible')
      })
      it('Random mood is displayed', () => {
        cy.get('img.mood-display')
          .should('exist')
        cy.get('h3.mood-display')
          .should('exist')
      });
      it("'Play again' button appears", () => {
        cy.get('#play-again')
          .should('be.visible')
      });
    });
  });
});