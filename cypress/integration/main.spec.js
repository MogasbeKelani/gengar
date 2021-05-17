describe('Main Page', () => {
    it('Suggest videos if user has no posts/discussions\n\
    Expected: Display the message and suggested videos', () => {
        cy.visit('/')
        cy.expect(cy.contains('You have no posts or discussions but heres some suggested videos'))
          .to.exist
        cy.expect(cy.get('[title=YouTube video player]'))
          .to.exist
    })

    it('[Create Discussion] button navigates to create post\n\
    Expected: Create post page with the video url', () => {
        cy.contains('Create Discussion').click()
        cy.url().should('include', 'create-post-video')
        cy.get('[id="descriptionInput"]')
          .should('include.value', 'https://www.youtube.com')
    })
})