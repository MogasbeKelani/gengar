describe('Videos Page', () => {
    it('Type keywords on search box', () => {
        const word = 'algorithm'

        cy.visit('/searchVid')
        cy.get('[type=search]').clear().type(word)
        cy.get('[type=search]').should('have.value', word)
    })

    it('[Search] button searches videos on YouTube\n\
    Expected: Display searched videos', () => {
        const word = 'python'

        cy.get('[type=search]').clear().type(word)
        cy.contains('Search').click()
        expect(cy.get('[title="YouTube video player"]'))
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

describe('Searching Video Test', () => {
    it('Searched videos match with the keywords [1/3]\n\
    Search keyword: cypress\n\
    Expected: "Cypress End-to-End Testing" video exist (7N63cMKosIE)', () => {
        const keyword = 'cypress'

        cy.visit('/searchVid')
        cy.get('[type=search]').clear().type(keyword)
        cy.contains('Search').click()
        cy.expect(cy.get('[src="https://www.youtube.com/embed/7N63cMKosIE"]'))
          .to.exist
    })

    it('searched videos match with the keywords [2/3]\n\
    Search keyword: react\n\
    Expected: React JS Tutorial video exist (Ke90Tje7VS0)', () => {
        const keyword = 'react'

        cy.visit('/searchVid')
        cy.get('[type=search]').clear().type(keyword)
        cy.contains('Search').click()
        cy.expect(cy.get('[src="https://www.youtube.com/embed/Ke90Tje7VS0"]'))
          .to.exist
    })

    it('searched videos match with the keywords [3/3]\n\
    Search keyword: sort algorithm\n\
    Expected: Insertion Sort Algorithm video exist (nKzEJWbkPbQ)', () => {
        const keyword = 'sort algorithm'

        cy.visit('/searchVid')
        cy.get('[type=search]').clear().type(keyword)
        cy.contains('Search').click()
        cy.expect(cy.get('[src="https://www.youtube.com/embed/nKzEJWbkPbQ"]'))
          .to.exist
    })
})