describe('Handle page', ()=>{
    it('Approach 1', ()=>{
        cy.visit("https://the-internet.herokuapp.com/windows") //Parent page

        cy.get(".example>a").invoke('removeAttr', 'target').click();
        cy.url().should('include', 'https://the-internet.herokuapp.com/windows/new') //child page
        
        cy.wait(5000)
        //Operations
        cy.go('back') //back to the parent tab

    })

    it('Approach 2', ()=>{
        cy.visit("https://the-internet.herokuapp.com/windows") //Parent page

        cy.get(".example>a").then((e)=>{
            let url=e.prop('href');
            cy.visit(url);
        })

        cy.url().should('include', 'https://the-internet.herokuapp.com/windows/new') //child page                
        cy.wait(5000)
        //Operations
        cy.go('back') //back to the parent tab

    })
})