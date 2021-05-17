describe('Discussion Page', () => {
    it('opens a post by clicking the title\n\
    Expected: Redirect to the corresponding post', () => {
        const title = 'full stack'

        cy.visit('/discussion')
        cy.contains(title).click()
        cy.url().should('include', '/post')
        cy.get().should('include', title)
    })

    it('searching discussions\n\
    Expected: Display dicussions with the search keyword', () => {
        const targetTitle = 'sorting algorithm'
        const nonTargetTitle = 'searching algorithm'

        cy.visit('/discussion')
        cy.get('[id="search"]')
          .clear()
          .type(targetTitle + '{enter}')
        cy.expect(cy.contains(targetTitle).to.exist)
        cy.expect(cy.contains(nonTargetTitle).to.not.exist)
    })

    it('[Start a Discussion] button navigates to create post page\n\
    Expected: Redirect to create post page', () => {
        cy.visit('/discussion')
        cy.contains('Start a Discussion').click()
        cy.url().should('include', '/create-post')
    })
})

describe('Title Character Counter Test', () => {
    it('counting chars correctly\n\
    Expected: Remaining chars: 95', () => {
        const word = 'hello'

        cy.get('[name="title"]').clear()
        cy.get('small').eq(0).should('include.text', ": 100")
        cy.get('[name="title"]').type(word)
        cy.get('small').eq(0).should('include.text', ": 95")
    })

    it('counting chars correctly\n\
    Expected: Remaining chars: 0', () => {
        const word = '0123456789'

        cy.get('[name="title"]').clear()
        cy.get('small').eq(0).should('include.text', ": 100")
        for (let i = 0; i < 10; i++) {
            cy.get('[name="title"]').type(word)
        }
        cy.get('small').eq(0).should('include.text', ": 0")
    })

    it('Title empty error\n\
    Expected: Error msg shows up', () => {
        cy.get('[name="title"]').clear()
        cy.get('small').eq(0).should('include.text', 100)
        cy.get('[type="submit"').contains('Create').click()
        cy.contains('Please fill out this field.').should('be.visible')
    })

    it('Title limit exceeded error\n\
    Expected: Error msg window shows up', () => {
        const word = '01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567891'

        cy.get('[name="title"]').clear()
        cy.get('small').eq(0).should('include.text', 100)
        cy.get('[name="title"]').type(word)
        cy.get('small').eq(0).should('include.text', -1)
        cy.get('[type="submit"').contains('Create').click()
        cy.get('.swal2-html-container')
          .should('have.text', 'Title character Limit Exceeded')
        cy.contains('OK').click()
    })
})

describe('Description Character Counter Test', () => {
    it('counting chars correctly\n\
    Expected: Remaining chars: 495', () => {
        const word = 'hello'

        cy.get('[name="title"]').clear()
        cy.get('small').eq(1).should('include.text', ": 500")
        cy.get('[name="description"]').eq(1).type(word)
        cy.get('small').eq(1).should('include.text', ": 495")
    })

    it('counting chars correctly\n\
    Expected: Remaining chars: 0', () => {
        const word = '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789'

        cy.get('[name="description"]').eq(1).clear()
        cy.get('small').eq(1).should('include.text', ": 500")
        for (let i = 0; i < 5; i++) {
            cy.get('[name="description"]').eq(1)
              .type(word)
        }
        cy.get('small').eq(1).should('include.text', ": 0")
    })

    it('Description empty error\n\
    Expected: error msg window shows up', () => {
        const word = 'hello'

        cy.get('[name="title"]').clear()
        cy.get('[name="title"]').type(word)
        cy.get('small').eq(1).should('include.text', ": 500")
        cy.get('[type="submit"').contains('Create').click()
        cy.contains('Please fill out this field.')
          .should('be.visible')
    })

    it('Description limit exceeded error\n\
    Expected: error msg window shows up', () => {
        const word = '01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567891'
        cy.get('[name="description"]').eq(1).clear()
        cy.get('small').eq(1)
          .should('include.text', 500)
        for (let i = 0; i < 5; i++) {
            cy.get('[name="description"]').eq(1)
              .type(word)
        }
        cy.get('small').eq(1)
          .should('include.text', -5)
        cy.get('[type="submit"').contains('Create').click()
        cy.get('.swal2-html-container')
          .should('have.text', 'Description character Limit Exceeded')
        cy.contains('OK').click()
    })
})