describe('Pet Shop Automation', () => {

    let adminData;
    
    before(() => {
      cy.fixture('addNewProduct').then((data) => {
        adminData = data;
      });
    });
  
    it('Validate add new product from admin portal', () => {
      // Command will visit admin portal and login with valid credentials.
      cy.adminlogin(adminData.adminUrl, adminData.adminUser, adminData.adminPassword)
        .then(() => {
          cy.checkElementExistence('.cursor-pointer > .logo'); // Verify Website Loaded with company logo
          cy.checkElementExistenceByXpath('//span[text()=" LOGOUT "]'); // Verify login is successful and displaying logout button
          cy.checkElementExistenceByXpath('//p[text()="Dashboard"]'); // Verify we landed successfully on admin dashboard
          cy.checkElementExistenceByXpath('//p[text()="Monthly sales"]'); // Verify monthly sales text is displayed
          cy.checkElementExistenceByXpath('//div[text()="Total Earnings"]');    // Verify Total earnings text is displayed
          cy.checkElementExistenceByXpath('//div[text()="Potential earnings"]'); // Verify potential earnings text is displayed
          cy.checkElementExistenceByXpath('//div[text()="Shipment Location"]'); // Verify Shipment location tab is displayed
          cy.checkElementExistenceByXpath('//div[text()="Customers"]'); // Verify Customers tab is displayed
        });
        cy.clickElementByXpath('//div[text()="Products"]') // To navigate to products tab and validate the dashboard
        .then(()=>{
            cy.checkElementExistenceByXpath('//span[text()="dashboard-products"]')
            cy.checkElementExistence('[data-testid="filters-control"] > .d-inline-block')
            cy.checkElementExistence('[data-testid="title"]')
        });
        
        const dynamicSelector = '#product-card__image-input';
        // Command will add new product with the data we passed as parameter  and validate successful message.
        cy.addNewProductSearch(dynamicSelector,adminData.productImage,adminData.brandName,adminData.productName,adminData.productCategory,adminData.price,adminData.productDesc)
        .then(()=>{
            cy.checkElementExistenceByXpath('//span[text()="New Product added succssefully"]')
        });
    });
  
  });
  