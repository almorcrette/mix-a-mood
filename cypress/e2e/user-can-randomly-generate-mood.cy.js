describe('Homepage', () => {
  describe('User can randomly generate a mood', () => {
    it("User clicks 'randomise' button and a random mood is displayed with play again button", () => {
      cy.visit('localhost:3030')

      cy.get('[id="randomise"]').click()

      cy.get('img.mood-display')
        .should('exist')
      cy.get('h3.mood-display')
        .should('exist')
      cy.get('#play-again')
        .should('be.visible')
    })
  })
})