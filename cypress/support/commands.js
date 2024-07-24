// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
/// <reference types="cypress-xpath" />
import 'cypress-xpath';

// cypress/support/commands.js

//-- This will login in application using Customer credentials --
Cypress.Commands.add('customerlogin', (url,username, password) => {
    cy.visit(url)
    cy.title().should('eq','Pet shop')
    cy.xpath('//span[text()=" LOGIN "]').click();
    cy.get('.logo-wrapper').should('exist')
    cy.xpath('//label[text()="Email"]/following-sibling::input').type(username)
    cy.xpath('//label[text()="Password"]/following-sibling::input').type(password)
    cy.xpath('//label[text()="Remember me"]').should('exist')
    cy.get('.login__form > .v-btn > .v-btn__content').click();
  });

  //-- This command will search product from customer portal --
Cypress.Commands.add('productSearch', (productName) => {
    cy.xpath('//label[text()="Search products"]/following-sibling::input').type(productName).then(($input) => {
        const enterEvent = new Event('keydown', { bubbles: true });
        enterEvent.key = 'Enter';
        $input[0].dispatchEvent(enterEvent);
    });
  });

  
  