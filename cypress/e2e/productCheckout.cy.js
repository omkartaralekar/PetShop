
describe('Pet Shop Automation',()=>{
   
    it('should log in successfully', () => {
        cy.fixture('testData').then((user) => {
          cy.customerlogin(user.customerUrl,user.username, user.password);
          cy.get('.cursor-pointer > .logo')   
          cy.xpath('//span[text()=" LOGOUT "]').should('exist')
          cy.productSearch(user.productText);
        })
    })
})