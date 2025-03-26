describe('Handle Tables', (()=>{
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

    it.skip('Check Number of rows and columns',()=>{
        cy.get("table[aria-label='list table']>tbody>tr").should('have.length', '10');
        cy.get("table[aria-label='list table']>thead>tr>th>p:first-child").should('have.length', '9');


    })

    it.skip('Check cell data from specific rows and columns',()=>{

        cy.get("table[aria-label='list table']>tbody>tr:nth-child(5)>td:nth-child(3)>div>p:first-child")
        .contains("Tasfir Suman")

        cy.get("table[aria-label='list table']>tbody>tr:nth-child(5)>td:nth-child(3)>div>p:nth-child(2)")
        .should('be.visible')
        .then(($el) => {
            console.log($el.text());  // Log the text content of the element to the console
        });
      
    })

    it.skip('Read all the rows and columns data in the first page',()=>{
        cy.get("table[aria-label='list table']>tbody>tr")
            .each(($row, index, $rows)=>{
                cy.wrap($row).within(()=>{
                    cy.get("td").each(($col, index, $cols)=>{
                        cy.log($col.text());

                    })

                })
            })

        
    })

    it.skip('Pagination',()=>{
        cy.wait(3000)
        cy.get("button[aria-label='Go to page 64']").then(((e)=>{
            let totalpages = e.text()
            cy.log("Total Number of page: "+totalpages)
            // totalpage= totapages.substring(totapages.indexOf("(")+1, totapages.indexOf("Pages")-1);
            for(let p=1; p<=totalpages; p++){
                
                if(totalpages>1){
                    cy.log("Active page is===:",+p);
                    cy.get("ul[class='MuiPagination-ul css-nhb8h9']>li:nth-child("+p+")").click()
                    cy.wait(10000);

                    cy.get("table[aria-label='list table']>tbody>tr")
                    .each(($row, index, $rows)=>{
                        cy.wrap($row).within(()=>{
                            cy.get("td:nth-child(3)>div>p:nth-child(2)").then((e)=>{
                                cy.log(e.text)
                            })
                        })
                    })


                }

            }
        }))
     
      
    })

    it.only('Pagination', () => {
        cy.wait(3000);
    
        // Get the total number of pages
        cy.get("button[aria-label^='Go to page']")
            .last()
            .invoke('text')
            .then((totalPages) => {
                totalPages = parseInt(totalPages.trim()); // Convert text to a number
                cy.log("Total Number of Pages: " + totalPages);
    
                for (let p = 2; p <= totalPages; p++) {  // ✅ Skip clicking on page 1
                    cy.log("Navigating to page: " + p);
    
                    // Click on the pagination button, but only if it's visible
                    cy.get(`button[aria-label='Go to page ${p}']`)
                        .should('be.visible')
                        .click();
    
                    // Wait for the table to update
                    cy.get("table[aria-label='list table']>tbody>tr")
                        .should('be.visible') // Ensure rows are loaded
                        .each(($row) => {
                            cy.wrap($row)
                                .find("td:nth-child(3)>div>p:nth-child(2)")
                                .invoke('text')
                                .then((text) => {
                                    cy.log(text.trim());
                                });
                        });
    
                    cy.wait(2000); // Short wait before going to the next page
                }
            });
    });
    
}))