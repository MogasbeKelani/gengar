describe('Coding Questions Page', () => {
    it('Type keywords on search box', () => {
        const word = 'list'

        cy.visit('/searchQuestions')
        cy.get('[type=search]').clear().type(word)
        cy.get('[type=search]').should('have.value', word)
    })

    it('[Search] button searches questions\n\
    Expected: Display searched questions', () => {
        const word = 'list'

        cy.get('[type=search]').clear().type(word)
        cy.contains('Search').click()
        expect(cy.contains('Remove Duplicates From an Unsorted Linked List'))
          .to.exist
    })

    it('Navigates to the coding question on click\n\
    Expected: Redirect to LeetCode question page', () => {
        cy.contains('Remove Duplicates From an Unsorted Linked List').click()
        cy.url().should('include', 'leetcode.com')
    })
})