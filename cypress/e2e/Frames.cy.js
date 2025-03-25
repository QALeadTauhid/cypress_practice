import 'cypress-iframe'

describe('handling frames', ()=>{

    it('approach 1', ()=>{
        cy.visit("http://the-internet.herokuapp.com/iframe")

        const iframe=cy.get("#mce_0_ifr")
        .its('0.contentDocument.body')
        .should('be.visible')
        .then(cy.wrap)

        iframe.clear().type("Welcome {cmd+a}");
        cy.get("[aria-label='Bold']").click()

    })


    it('approach 2 by using custom command', ()=>{
        cy.visit("http://the-internet.herokuapp.com/iframe")

        cy.getIframe('mce_0_ifr').clear().type("Welcome {cmd+a}");
        cy.get("[aria-label='Bold']").click()

    })

//  npm install -D cypress-iframe
    it.only('approach 3 by using cypress iFrame Plugin', ()=>{
        cy.visit("http://the-internet.herokuapp.com/iframe")

        cy.frameLoaded('mce_0_ifr'); //loas the frame

        cy.iframe('mce_0_ifr').clear().type("Welcome {cmd+a}");
        cy.get("[aria-label='Bold']").click()

    })

})