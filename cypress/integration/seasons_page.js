describe('Integration Tests', () => {
  beforeEach(() => {
    cy.server()
    cy.fixture('champion_2015.json').as('champion')
    cy.fixture('races_2015.json').as('races')
    cy.route(
      'GET',
      'http://ergast.com/api/f1/2015/results/1.json',
      'fixture:results_2015_1.json',
    )
    cy.route(
      'GET',
      'http://ergast.com/api/f1/**/driverStandings.json',
      'fixture:driverStandings_2015.json',
    )
    cy.visit('/', {
      onBeforeLoad: win => {
        win.fetch = null
      },
    })
  })

  it('Renders champions with points and wins per season', () => {
    cy.fixture('champion_2015.json').then(champion => {
      cy.get('[data-cy="champion-name"]').should('contain', champion.name)
      cy.get('[data-cy="champion-points"]').should('contain', champion.points)
      cy.get('[data-cy="champion-wins"]').should('contain', champion.wins)
    })
  })

  it('Navigates to races details when clicking on season', () => {
    cy
      .get('[data-cy="champion-name"]')
      .first()
      .click()
    cy.fixture('champion_2015.json').then(champion => {
      cy.fixture('races_2015.json').then(races => {
        cy
          .get('[data-cy="champions-race"] .grommetux-value__value')
          .should('contain', champion.name)
        cy
          .get('[data-cy="race-tile"]:first')
          .should('contain', races[0].name)
          .and('contain', races[0].winnerName)
      })
    })
  })

  it('Navigates to races details directly from url and navigates home when clicking on logo', () => {
    cy.visit('/2015')
    cy.fixture('races_2015.json').then(races => {
      cy
        .get('[data-cy="race-tile"]:last')
        .should('contain', races[ races.length-1].name)
        .and('contain', races[ races.length-1].winnerName)
    })
    cy.get('[data-cy="app-logo"]').click()
    cy.location('pathname').should('eq', '/')
  })


})
