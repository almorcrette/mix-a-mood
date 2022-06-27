describe('Homepage', () => {
    describe('Users are told if mood is not recognised', () => {
        describe("User types an word and clicks 'generate'", () => {
            describe('in the context where the thesaurus generates no similar words', () => {
                beforeEach(() => {
                    cy.visit('/')
            
            
                    cy.get('[id="emotion-input"]')
                      .type('hamster')
                    cy.get('[id="generate"]').click()
              
                  });
                  it('Emotion selection UI disappears', () => {
                    cy.get('.emotion-selection')
                    .should('not.be.visible')
                  });
                  it('Prototype expression disapears', () => {
                    cy.get('#prototype-expression')
                      .should('not.be.visible')
                  })
                  it('Not-found image is displayed', () => {
                    cy.get('img.mood-display')
                      .should('have.attr', 'src', 'static/images/not-found.png')
                    cy.get('h3.mood-display')
                      .should('contain', "I don't recognise that mood")
                  });
                  it("'Play again' button appears", () => {
                    cy.get('#play-again')
                      .should('be.visible')
                  });
            });
            describe('in the context where the thesaurus generates similar words but none are a match in the in-built library', () => {
                beforeEach(() => {
                    cy.visit('/')
            
            
                    cy.get('[id="emotion-input"]')
                      .type('brown')
                    cy.get('[id="generate"]').click()
              
                  });
                  it('Emotion selection UI disappears', () => {
                    cy.get('.emotion-selection')
                    .should('not.be.visible')
                  });
                  it('Prototype expression disapears', () => {
                    cy.get('#prototype-expression')
                      .should('not.be.visible')
                  })
                  it('Not-found image is displayed', () => {
                    cy.get('img.mood-display')
                      .should('have.attr', 'src', 'static/images/not-found.png')
                    cy.get('h3.mood-display')
                      .should('contain', "I don't recognise that mood")
                  });
                  it("'Play again' button appears", () => {
                    cy.get('#play-again')
                      .should('be.visible')
                  });
            });
            // describe('in the context where the thesaurus does not recognise the word at all', () => {

            // })
        })
    })
})