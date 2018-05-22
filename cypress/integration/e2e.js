describe('End to end test', () => {
  beforeEach(() => {
    cy.server()
    cy
      .route('GET', 'http://ergast.com/api/f1/**/driverStandings.json')
      .as('seasons')
    cy.route('GET', 'http://ergast.com/api/f1/**/results/1.json').as('races')

    cy.log(
      'Running end to end tests. Make sure the machine is connected to the internet',
    )
    cy.visit('/')
  })

  it('Can see all seasons navigate to season details andd see champions race highlighted', () => {
    cy.wait('@seasons') // wait on first  call to finish..
    cy.wait(3000) // wait on rest of calls, no option to wait for parallel in cypress :(
    for (var season = 2005; season <= 2015; season++) {
      cy
        .get('label')
        .contains(season)
        .should('exist')
    }
    cy
      .get('[data-cy="champion-name"] .grommetux-value__value')
      .first()
      .click()
      .then($champ => {
        cy.wait('@races')
        cy
          .get('[data-cy="champions-race"] .grommetux-value__value')
          .contains($champ.text())
      })
  })
})
