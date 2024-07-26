/// <reference types="cypress-xpath" />
import 'cypress-xpath';
import 'cypress-file-upload';
// cypress/support/commands.js

//-- This will login in application using Customer credentials --
Cypress.Commands.add('customerlogin', (url, username, password) => {
  cy.visit(url)
      .title().should('eq', 'Pet shop')  // Assert the page title
      .then(() => {
          // Perform actions after title assertion
          cy.clickElementByXpath('//span[text()=" LOGIN "]');  // Click login button
          cy.checkElementExistence('.logo-wrapper');     // Assert logo exists
          cy.xpath('//label[text()="Email"]/following-sibling::input').type(username);  // Type username
          cy.xpath('//label[text()="Password"]/following-sibling::input').type(password);  // Type password
          cy.checkElementExistenceByXpath('//label[text()="Remember me"]');  // Assert "Remember me" checkbox exists
          cy.clickElement('.login__form > .v-btn > .v-btn__content');  // Click the submit button
      });
});

//-- This will login in admin portal using admin credentials --
Cypress.Commands.add('adminlogin', (url, username, password) => {
  cy.visit(url)
      .title().should('eq', 'Login')  // Assert the page title
      .then(() => {
          // Perform actions after title assertion
          cy.checkElementExistence('.logo-wrapper');     // Assert logo exists
          cy.xpath('//label[text()="Email"]/following-sibling::input').type(username);  // Type username
          cy.xpath('//label[text()="Password"]/following-sibling::input').type(password);  // Type password
          cy.clickElement('.v-btn');  // Click on Login button
      });
});



  //-- This command will search product from customer portal --
Cypress.Commands.add('productSearch', (productName) => {
    cy.xpath('//label[text()="Search products"]/following-sibling::input').type(productName).then(($input) => {
        const enterEvent = new Event('keydown', { bubbles: true });
        enterEvent.key = 'Enter';
        $input[0].dispatchEvent(enterEvent);
    });
  });

  //-- This command will Add new  product from admin portal --
  Cypress.Commands.add('addNewProductSearch', (dynamicSelector,productImage,brandName,productName,productCategory,price,productDesc) => {
    //cy.clickElementByXpath('//span[text()=" add new product "]')
    cy.clickElement('.table-header__content > .v-btn')
    cy.uploadFile(dynamicSelector,productImage)
    cy.clickElementByXpath('//label[text()="Brand name"]/following-sibling::div')
    cy.clickElementByXpath('//div[text()="manapro"]')
    cy.xpath('//label[text()="Product name"]/following-sibling::input').type(productName)
    cy.clickElementByXpath('//label[text()="Category"]/following-sibling::div')
    cy.clickElementByXpath('//div[text()="wet pet food"]')
    cy.xpath('//label[text()="Price"]/following-sibling::input').type(price)
    cy.xpath('//label[text()="Description"]/following-sibling::textarea').type(productDesc)
    cy.clickElementByXpath('//span[text()=" save changes "]')
  });


//-- This command will Perform Click on locator that passed
  Cypress.Commands.add('clickElement', (locator) => {
    cy.get(locator).click();
});

// Custom command to click an element using XPath
Cypress.Commands.add('clickElementByXpath', (xpath) => {
  cy.xpath(xpath).click();
});


// Custom command to extract and store text
Cypress.Commands.add('extractAndStoreText', (locator, alias) => {
  cy.get(locator)
    .invoke('text')
    .then((textValue) => {
        const extractedText = textValue.trim();
        cy.wrap(extractedText).as(alias);
    });
});


// Custom command to validate text
Cypress.Commands.add('validateText', (locator, alias) => {
  cy.get(alias).then((storedText) => {
      cy.get(locator).should('have.text', storedText);
  });
});

// Custom command to check if an element exists
Cypress.Commands.add('checkElementExistence', (locator,shouldExist = true) => {
  if (shouldExist) {
    cy.get(locator).should('exist');
} else {
    cy.get(locator).should('not.exist');
}
});


// Custom command to check if an element exists using XPath
Cypress.Commands.add('checkElementExistenceByXpath', (xpath, shouldExist = true) => {
  if (shouldExist) {
      cy.xpath(xpath).should('exist');
  } else {
      cy.xpath(xpath).should('not.exist');
  }
});

// Custom command to fill shipping address details
Cypress.Commands.add('fillShippingAddress', (firstName,lastName,addressLine1,addressLine2,city,state,zipCode,country) => {
 cy.xpath('//label[text()="First name *"]/following-sibling::input').type(firstName);
 cy.xpath('//label[text()="Last name *"]/following-sibling::input').type(lastName);
 cy.xpath('//label[text()="Address line 1 *"]/following-sibling::input').type(addressLine1);
 cy.xpath('//label[text()="Address line 2 *"]/following-sibling::input').type(addressLine2);
 cy.xpath('//label[text()="City"]/following-sibling::input').type(city);
 cy.xpath('//label[text()="State/Province/Region"]/following-sibling::input').type(state);
 cy.xpath('//label[text()="Zip/Postal code *"]/following-sibling::input').type(zipCode);
 cy.xpath('//label[text()="Country *"]/following-sibling::input').type(country);
});


// Command to select checkbox
Cypress.Commands.add('checkCheckbox', (locator) => {
  cy.xpath(locator)  // Use the locator to find the checkbox
      .check({ force: true })  // Check the checkbox; `force: true` is used to interact with hidden checkboxes
      .should('be.checked');  // Assert that the checkbox is checked
});


//Command to Select Credit Card as payment mode and fill details.
Cypress.Commands.add('selectCreditCardMode', (creditCardNumber,expiry,cvv) => {
  cy.clickElementByXpath('//p[text()="Credit Card"]');
  cy.xpath('//label[text()="Credit Card number *"]/following-sibling::input').type(creditCardNumber);
  cy.xpath('//label[text()="Expiry *"]/following-sibling::input').type(expiry);
  cy.xpath('//label[text()="CVV *"]/following-sibling::input').type(cvv);
});

//Command to Upload new file.
Cypress.Commands.add('uploadFile', (dynamicSelector,fileName) => {

  const filePath = `uploadImages/${fileName}`;
   // Load the file from the fixtures folder
   cy.fixture(filePath).then(fileContent => {
     // Convert the file content to Blob format
     const blob = Cypress.Blob.base64StringToBlob(fileContent, 'image/jpeg');
      const file = new File([blob], filePath, { type: 'image/jpeg' });

      // Attach the file using the attachFile command
      cy.get(dynamicSelector).attachFile({
        fileContent: file,
        fileName: filePath,
        mimeType: 'image/jpeg',
     });
   });
});
  
  