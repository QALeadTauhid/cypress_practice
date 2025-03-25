/// <reference types="Cypress"/>

describe('handle dropdowns', ()=>{

    it('Dropdown with select', ()=>{
        cy.visit("https://www.zoho.com/commerce/free-demo.html")
        // cy.get("//select[@id='zcf_address_country']")
        cy.get("#zcf_address_country")
        .select('Italy')
        .should('have.value', 'Italy')


    })

    it('Dropdown without select', ()=>{
        cy.visit("https://www.dummyticket.com/dummy-ticket-for-visa-application")
        // cy.get("//select[@id='zcf_address_country']")
        cy.get("#select2-billing_country-container").click()
        cy.get("input.select2-search__field").type("Italy").type("{enter}")
        cy.get("#select2-billing_country-container")
        .should('have.text', 'Italy')

    })

    it('Auto suggest Dropdown', ()=>{
        cy.visit("https://www.wikipedia.org")
        // cy.get("//select[@id='zcf_address_country']")
        cy.get("#searchInput").type("Delhi")
        cy.get(".suggestion-title").contains("Delhi University").click()
        cy.get("h1[id='firstHeading'] span[class='mw-page-title-main']")
        .should('have.text', 'Delhi University')

    })


    it.only('Dynamic Dropdown', () => {
        cy.visit("https://www.google.com/");
    
        // Type in the search box
        cy.get("#APjFqb").type("cypress automation");
        cy.wait(5000)
    
        // Wait dynamically until dropdown options load
        cy.get("div.wM6W7d>span").should('have.length', 13);
    
        // Iterate through the dropdown options
        cy.get("div.wM6W7d>span").each(($el, _index, $list) => {
            if ($el.text().trim() === "cypress automation tutorial") {
                cy.wrap($el).click({ force: true });
            }
        });
    
        // Assert that the search input now has the selected value
        cy.wait(5000)
        cy.get("#APjFqb").should('have.text', 'cypress automation tutorial');
    });
    
})