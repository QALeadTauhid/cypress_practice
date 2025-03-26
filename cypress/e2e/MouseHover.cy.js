describe("Mouse Operation",()=>{
    // it.only("MouseHover", ()=>{
    //     cy.visit("https://demo.opencart.com/")
    //     cy.get("")
    //     .should('not.be.visible')
    //     cy.get(".nav-link.dropdown-toggle[href='https://demo.opencart.com/en-gb/catalog/desktops']")
    //     cy.get("")
    //     .should('be.visible');

    it('Bypass Cloudflare with Cookies', () => {
        cy.setCookie('cf_clearance', 'bp4Exrr0SC76st5lML3WnajJ5lMnATu_oEjd11umj1Y-1742978631-1.2.1.1-IWS7ofr32T1m_uqWrooIU7BGfPoB2FaHOgqQIC_C1PCgm0Ygc3DJpNtprOfa5yKao2bKjrDx3O97OONfE5tNcy9XA_4OTkViM0efHc8GQazYGt.Tw5JSOHarSUhnEF1CzQLTqpkkq_5ycDX99xa0OB9d5QtjqeiOzzP3zPsomxB9ooEGkMIILUyh.PBfgK7uHOEOcwlg1fsI2LGEAhv0aR3VKj3Nb0LwnMzu22P73CPjA4FUQt9q6npFVm3nsIHiw1N3dA1dLQjPQtaIhujebaFYJrkJMKlpd2HKly11gqZb9SQ5goJK4yBsdu2hBpG6zebWfwI6cIzFTziuvTJ9niqlZUF._N4Umx4KaOBtsFv_DIs1zfQ8KBbAAPQmVFre0wuwgGDFkS7Zvxt1pQDQmhJKKk88DcdQGyjAR9U8K1E');
        cy.visit('https://demo.opencart.com/');
    });
    
});

        

