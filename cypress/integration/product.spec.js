describe('Product page', function() {
    it('can add item to cart', function() {
      cy.visit('http://localhost:8000/products/196895086')
      cy.get('[data-cy=btn]').click().should(() => {
        const cartContents = JSON.parse(localStorage.getItem('react-use-cart'))
        expect(cartContents.items[0].id).to.eql('2190245250')
        expect(cartContents.totalItems).to.eql(1)
      })
    })

    it('entering shipping address returns payment component', function() {
        cy.visit('http://localhost:8000/products/196895086')
        cy.get('[data-cy=btn]').click()
        cy.visit('http://localhost:8000/checkout')

        // Type into form:
        cy.get('[data-cy=shipping-name]').type('Nicholas Marino')
        cy.get('[data-cy=shipping-email]').type('contact@nmarino.dev')
        cy.get('[data-cy=shipping-address]').type('338 Main St')
        cy.get('[data-cy=shipping-city]').type('Cold Spring')
        cy.get('[data-cy=shipping-state]').select('NY')
        cy.get('[data-cy=shipping-zip]').type('10516')

        // Submit form and expect payment box to appear:
        cy.get('[data-cy=btn]').click()
        //   .should(() => {
        expect(cy.contains('Payment')).to.exist
        //   })
      })
  })