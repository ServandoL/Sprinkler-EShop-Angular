describe('Visit Sprinkler EShop', () => {
  it('Visits the web page.', () => {
    cy.visit('/')
  })

  it('Should click on product dropdown button and visit controllers page', () => {
    cy.get('#ProductDropdownBtn').click();
    cy.get('#Controllers').click();
    cy.url().should('contain', '/products/controllers');
    cy.wait(1000);
  })

  it('Should click on product dropdown button and visit rotors page', () => {
    cy.get('#ProductDropdownBtn').click();
    cy.get('#Rotors').click();
    cy.url().should('contain', '/products/rotors');
    cy.wait(1000);
  })
  it('Should click on product dropdown button and visit rotors page', () => {
    cy.get('#ProductDropdownBtn').click();
    cy.get('#Bodies').click();
    cy.url().should('contain', '/products/sprinkler-bodies');
    cy.wait(1000);
  })
  it('Should click on product dropdown button and visit rotors page', () => {
    cy.get('#ProductDropdownBtn').click();
    cy.get('#Nozzles').click();
    cy.url().should('contain', '/products/sprinkler-nozzles');
    cy.wait(1000);
  })
  it('Should click on product dropdown button and visit rotors page', () => {
    cy.get('#ProductDropdownBtn').click();
    cy.get('#Valves').click();
    cy.url().should('contain', '/products/valves');
    cy.wait(1000);
  })
})
