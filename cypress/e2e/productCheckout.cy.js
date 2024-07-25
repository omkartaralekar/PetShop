
describe('Pet Shop Automation', () => {

  it('Validate product checkout from customer portal', () => {

    // Command will visit customer portal and login with valid credentials.
    cy.customerlogin(user.customerUrl, user.username, user.password)
      .then(() => {
        cy.checkElementExistence('.cursor-pointer > .logo') // Verify Website Loaded with company logo
        cy.checkElementExistenceByXpath('//span[text()=" LOGOUT "]') // Verify login is successful and displaying logout button
      });

    cy.productSearch(user.productText); //Command will search product using search function 
    cy.extractAndStoreText(':nth-child(1) > .v-list-item__content > .text-capitalize', 'extractedText'); //Will store the product name in variable to validate further
    cy.clickElement(':nth-child(1) > .v-list-item__content > .text-capitalize');// Click on the first Product in the list
    cy.validateText('.product__title', '@extractedText');// Use the stored value to validate the new text


    cy.checkElementExistenceByXpath('//span[text()=" add to cart "]');// To verify Add to cart button is present on webpage
    cy.extractAndStoreText('.product__price', 'productPrice');
    // Click on the first Product in the list and verify remove from cart button is present
    cy.clickElementByXpath('//span[text()=" add to cart "]')
      .then(() => {
        cy.checkElementExistenceByXpath('//span[text()=" remove from cart "]');
      });

    // Click on the Cart button from top bar
    cy.clickElementByXpath('(//span[@class="v-btn__prepend"]/following-sibling::span)[1]')
      .then(() => {
        cy.validateText('p[class*="prodcut__title"]', '@extractedText');// Use the stored value to validate the Product name in cart
        cy.checkElementExistenceByXpath('//span[text()=" Remove from cart "]');// To verify Add to cart button is present on webpage
      });

    // Click on the Proceed To Checkout button from top bar
    cy.clickElementByXpath('//span[text()=" Proceed to checkout "]')
      .then(() => {
        cy.checkElementExistenceByXpath('//header[text()="Checkout"]');// Verify Checkout page header exists
        cy.checkElementExistenceByXpath('//h4[text()="Shipping address"]'); // Verify Shipping address section exists
      });

    // Command fills details for shipping   
    cy.fillShippingAddress(user.firstName, user.lastName, user.addressLine1, user.addressLine2, user.city, user.state, user.zipCode, user.country);

    cy.checkCheckbox('//label[text()="Use this address for payment details "]/preceding-sibling::div//input'); // Select checkbox for use same address for payment

    // Navigate to the next page i.e. Payment type
    cy.clickElementByXpath('//span[text()=" Next "]')
      .then(() => {
        cy.checkElementExistenceByXpath('//h4[text()="Type of payment"]');
      })

    cy.selectCreditCardMode(user.creditCardNumber, user.expiry, user.cvv) // To select payment mode as Credit card and fill details
    cy.clickElementByXpath('//span[text()=" Next "]')
      .then(() => {
        cy.checkElementExistenceByXpath('//h3[text()="Review your order"]');
        cy.checkElementExistenceByXpath('//p[text()="Summary"]');
        cy.checkElementExistenceByXpath('//p[text()="Total"]');
      })


    // Use the stored value to validate the product name on final summary page
    cy.validateText('.text-decoration-underline', '@extractedText');
    // To place order and verify successful message.
    cy.clickElementByXpath('//span[text()=" Place order "]')
      .then(() => {
        cy.checkElementExistenceByXpath('//h3[text()="Order placed successfully."]');
      })
  })

  let user;
  before(() => {
    cy.fixture('testData').then((data) => {
      user = data;
    })
  })
})