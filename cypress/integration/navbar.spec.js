describe('Nav Bar', () => {
    it('[GitGudCoders] button navigates to main page\n\
    Expected: Main page', () => {
        cy.visit('/')
        cy.get('.navbar').contains('GitGudCoders').click()
        cy.url().should('equal', 'localhost:5000')
    })

    it('[Discussion] button navigates to discussion page\n\
    Expected: Dicussion page', () => {
        cy.visit('/')
        cy.get('.navbar').contains('Discussion').click()
        cy.url().should('include', '/discussion')
    })

    it('[Videos] button navigates to videos page\n\
    Expected: Videos page', () => {
        cy.visit('/')
        cy.get('.navbar').contains('Videos').click()
        cy.url().should('include', '/searchVid')
    })

    it('[Coding Questions] button navigates to coding questions page\n\
    Expected: Questions page', () => {
        cy.visit('/')
        cy.get('.navbar').contains('Coding Questions').click()
        cy.url().should('include', '/searchQuestion')
    })
})