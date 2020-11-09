describe('Homepage', function() {
    it('front page can be opened', function() {
      cy.visit('http://localhost:8000')
      cy.contains('MegalitH')
      cy.contains('ArtifactS')
      cy.contains('HistorY')
    })
  })