describe('Interact with item quantities', () => {
  it('Should visit Controllers web page.', () => {
    cy.visit('/products/controllers');
    cy.wait(1000);
  });



  it('Should click on the plus button', () => {
    cy.get('#3f304efc-9bdf-11eb-bc13-1b053fbda344').then(
      div$ => {
        div$.find("button")
      }
    )
  })

  it('Should click on the minus button', () => {
    cy.get('[data-cy="MinusButton"]').click();
    cy.wait(1000);
  })
})
