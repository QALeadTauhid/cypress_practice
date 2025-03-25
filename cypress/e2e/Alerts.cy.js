describe("Alert: It have some text and an OK button",()=>{
    it('Have ok button', ()=>{
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        cy.get("button[onclick='jsAlert()']").click();
        cy.on('window:alert',(t)=>{
            expect(t).to.contain("I am a JS Alert")

        })
        //alert window automatically closed by cypress
        cy.get('#result').should('have.text', "You successfully clicked an alert")


    })

    it('Js confirm alert using ok button', ()=>{
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        cy.get("button[onclick='jsConfirm()']").click();
        cy.on('window:confirm',(t)=>{
            expect(t).to.contain("I am a JS Confirm")

        })
        //alert window automatically closed by cypress using ok button
        cy.get('#result').should('have.text', "You clicked: Ok")


    })

    it('Js confirm alert using cancel button', ()=>{
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        cy.get("button[onclick='jsConfirm()']").click();
        cy.on('window:confirm',(t)=>{
            expect(t).to.contain("I am a JS Confirm")

        })
        //Here the cypress using cancel button
        cy.on('window:confirm',()=>false) 

        cy.get('#result').should('have.text', "You clicked: Cancel ")


    })


    it('Js Prompt alert with text box', ()=>{
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')

        cy.window().then((win)=>{
            cy.stub(win,'prompt').returns('welcome');
        })
        cy.get("button[onclick='jsPrompt()']").click();
        
        cy.get('#result').should('have.text', "You entered: welcome")


    })


    it.only('Authenticated alert approach 1', ()=>{
        cy.visit('https://the-internet.herokuapp.com/basic_auth', {auth: 
                                                                  {username: "admin", 
                                                                  password: "admin"}

        })

        cy.get("div[class='example'] p").should('have.contain', "Congratulations!")
      


    })

    it.only('Authenticated alert approach 2', ()=>{
        cy.visit('https://admin:admin@the-internet.herokuapp.com/basic_auth')

        cy.get("div[class='example'] p").should('have.contain', "Congratulations!")
      


    })

})