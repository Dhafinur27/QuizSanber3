describe('Login OrangeHRM - Intercept', () => {

  const loginUrl =
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';


  // TC-LGN-001
  it('TC-LGN-001 - Login menggunakan username dan password valid', () => {

    cy.visit(loginUrl);

    cy.get('input[name="username"]')
      .should('be.visible')
      .type('Admin');

    cy.get('input[name="password"]')
      .type('admin123');

    cy.intercept(
      'GET',
      'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary'
    ).as('summaryRequest');

    cy.get('button[type="submit"]')
      .click();

    cy.wait('@summaryRequest')
      .its('response.statusCode')
      .should('eq', 200);

    cy.url()
      .should('include', '/dashboard/index');

  });


  // TC-LGN-002
  it('TC-LGN-002 - Login menggunakan username valid dan password salah', () => {

    cy.visit(loginUrl);

    cy.get('input[name="username"]')
      .should('be.visible')
      .type('Admin');

    cy.get('input[name="password"]')
      .type('salah123');

    cy.intercept(
      'GET',
      'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages'
    ).as('messageRequest');

    cy.get('button[type="submit"]')
      .click();

    cy.wait('@messageRequest')
      .its('response.statusCode')
      .should('eq', 304);

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');

  });


  // TC-LGN-003
  it('TC-LGN-003 - Login menggunakan username salah dan password valid', () => {

    cy.visit(loginUrl);

    cy.get('input[name="username"]')
      .should('be.visible')
      .type('salahuser');

    cy.get('input[name="password"]')
      .type('admin123');

    cy.intercept(
      'GET',
      'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages'
    ).as('messageRequest');

    cy.get('button[type="submit"]')
      .click();

    cy.wait('@messageRequest')
      .its('response.statusCode')
      .should('eq', 304);

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');

  });


  // TC-LGN-004
  it('TC-LGN-004 - Login dengan username dan password kosong', () => {

    cy.visit(loginUrl);

    cy.intercept(
      'GET',
      'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages'
    ).as('messageRequest');

    cy.get('button[type="submit"]')
      .should('be.visible')
      .click();

    cy.get('.oxd-input-field-error-message')
      .should('have.length', 2);

  });


  // TC-LGN-005
  it('TC-LGN-005 - Login dengan username kosong dan password terisi', () => {

    cy.visit(loginUrl);

    cy.get('input[name="password"]')
      .should('be.visible')
      .type('admin123');

    cy.intercept(
      'GET',
      'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages'
    ).as('messageRequest');

    cy.get('button[type="submit"]')
      .click();

    cy.get('.oxd-input-field-error-message')
      .should('have.length', 1)
      .and('contain', 'Required');

  });


  // TC-LGN-006
  it('TC-LGN-006 - Login dengan username terisi dan password kosong', () => {

    cy.visit(loginUrl);

    cy.get('input[name="username"]')
      .should('be.visible')
      .type('Admin');

    cy.intercept(
      'GET',
      'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages'
    ).as('messageRequest');

    cy.get('button[type="submit"]')
      .click();

    cy.get('.oxd-input-field-error-message')
      .should('have.length', 1)
      .and('contain', 'Required');

  });


  // TC-LGN-007
  it('TC-LGN-007 - Memastikan password ditampilkan sebagai karakter tersembunyi', () => {

    cy.visit(loginUrl);

    cy.get('input[name="password"]')
      .should('be.visible')
      .type('admin123');

    cy.intercept(
      'GET',
      'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages'
    ).as('messageRequest');

    cy.get('input[name="password"]')
      .should('have.attr', 'type', 'password');

  });


  // TC-LGN-008
  it('TC-LGN-008 - Login menggunakan username dengan spasi di awal dan akhir', () => {

    cy.visit(loginUrl);

    cy.get('input[name="username"]')
      .should('be.visible')
      .type(' Admin ');

    cy.get('input[name="password"]')
      .type('admin123');

    cy.intercept(
      'GET',
      'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages'
    ).as('messageRequest');

    cy.get('button[type="submit"]')
      .click();

    cy.wait('@messageRequest')
      .its('response.statusCode')
      .should('eq', 304);

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');

  });

});