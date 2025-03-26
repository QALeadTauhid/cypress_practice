const fs = require('fs');  // Node.js file system module
describe('Pagination and Save Data', () => {
    let collectedData = [];
    beforeEach('Login',()=>{
        // cy.visit("https://demo.opencart.com/admin/index.php", { failOnStatusCode: false });
        cy.visit("https://admin-ptm-panel.pay2me.co/login");
        cy.get("input[id=':r0:']").type("itteam.9@aieus.com")
        cy.get('#auth-login-v2-password').type("sVs$j3z201IV")
        cy.get("button[id=':r1:']").click()

        //cy.get(".btn-close").click()
        //Customer main menu
        cy.wait(20000)
        cy.get("span:contains('Invoice Only')").click()
        //cy.get("#menu-customer>ul>li:first-child").click() //customer sub-item

    })
  // Array to store extracted data

    it('Pagination & Export to CSV', () => {
        cy.wait(3000);

        // Get total number of pages
        cy.get("button[aria-label^='Go to page']")
            .last()
            .invoke('text')
            .then((totalPages) => {
                totalPages = parseInt(totalPages.trim());
                cy.log("Total Number of Pages: " + totalPages);

                // Loop from page 1 to total pages
                for (let p = 1; p <= totalPages; p++) {
                    cy.log("Navigating to page: " + p);

                    if (p > 1) {  // Skip clicking on Page 1
                        cy.get(`button[aria-label='Go to page ${p}']`)
                            .should('be.visible')
                            .click();
                    }

                    // Wait until table rows are updated
                    cy.get("table[aria-label='list table']>tbody>tr")
                        .should('be.visible')
                        .each(($row) => {
                            cy.wrap($row)
                                .find("td:nth-child(3)>div>p:nth-child(2)")
                                .invoke('text')
                                .then((text) => {
                                    const rowData = {
                                        Page: p,
                                        Email: text.trim()
                                    };
                                    collectedData.push(rowData);  // Store data in array
                                });
                        });

                    cy.wait(2000); // Short wait before next page
                }
            });
    });

    after(() => {
        // Convert collected data to CSV format
        const csvData = [
            "Page,Email",  // CSV Header
            ...collectedData.map(row => `${row.Page},${row.Email}`)
        ].join("\n");

        // Save CSV file
        fs.writeFileSync('cypress/downloads/pagination_data.csv', csvData);
        cy.log("CSV File Saved: pagination_data.csv");
    });
});
