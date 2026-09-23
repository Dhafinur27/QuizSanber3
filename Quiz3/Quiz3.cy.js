describe('Login OrangeHRM', () => {

  // TC-LGN-001
  // Memastikan user dapat login menggunakan username dan password yang valid
  it('TC-LGN-001 - Login menggunakan username dan password valid', () => {

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get('input[name="username"]').type('Admin');

    cy.get('input[name="password"]').type('admin123');

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard/index');

  });


  // TC-LGN-002
  // Memastikan login ditolak jika password yang digunakan salah
  it('TC-LGN-002 - Login menggunakan username valid dan password salah', () => {

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get('input[name="username"]').type('Admin');

    cy.get('input[name="password"]').type('salah123');

    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');

  });


  // TC-LGN-003
  // Memastikan login ditolak jika username yang digunakan salah
  it('TC-LGN-003 - Login menggunakan username salah dan password valid', () => {

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get('input[name="username"]').type('salahuser');

    cy.get('input[name="password"]').type('admin123');

    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');

  });


  // TC-LGN-004
  // Memastikan sistem menampilkan pesan Required jika username dan password tidak diisi
  it('TC-LGN-004 - Login dengan username dan password kosong', () => {

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-field-error-message')
      .should('have.length', 2);

  });


  // TC-LGN-005
  // Memastikan sistem meminta username jika field username dikosongkan
  it('TC-LGN-005 - Login dengan username kosong dan password terisi', () => {

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get('input[name="password"]').type('admin123');

    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-field-error-message')
      .should('have.length', 1)
      .and('contain', 'Required');

  });


  // TC-LGN-006
  // Memastikan sistem meminta password jika field password dikosongkan
  it('TC-LGN-006 - Login dengan username terisi dan password kosong', () => {

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get('input[name="username"]').type('Admin');

    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-field-error-message')
      .should('have.length', 1)
      .and('contain', 'Required');

  });


  // TC-LGN-007
  // Memastikan karakter password ditampilkan dalam bentuk tersembunyi
  it('TC-LGN-007 - Memastikan password ditampilkan sebagai karakter tersembunyi', () => {

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get('input[name="password"]').type('admin123');

    cy.get('input[name="password"]')
      .should('have.attr', 'type', 'password');

  });


  // TC-LGN-008
  // Memastikan username dengan spasi di awal dan akhir tidak dapat digunakan untuk login
  it('TC-LGN-008 - Login menggunakan username dengan spasi di awal dan akhir', () => {

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get('input[name="username"]').type(' Admin ');

    cy.get('input[name="password"]').type('admin123');

    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');

  });


  // TC-LGN-009
  // Memastikan login ditolak jika password menggunakan huruf kapital
  it('TC-LGN-009 - Login dengan password menggunakan huruf kapital', () => {

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get('input[name="username"]').type('Admin');

    cy.get('input[name="password"]').type('ADMIN123');

    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');

  });


  // TC-LGN-010
  // Memastikan link Forgot Password dapat mengarahkan user ke halaman reset password
  it('TC-LGN-010 - Navigasi ke halaman Forgot Password', () => {

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get('.orangehrm-login-forgot-header')
      .click();

    cy.url().should('include', '/auth/requestPasswordResetCode');

  });


  // TC-LGN-011
  // Memastikan halaman login dapat diakses secara langsung melalui URL
  it('TC-LGN-011 - Mengakses halaman Login melalui URL langsung', () => {

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get('input[name="username"]')
      .should('be.visible');

    cy.get('input[name="password"]')
      .should('be.visible');

    cy.get('button[type="submit"]')
      .should('be.visible');

  });


  // TC-LGN-012
  // Memastikan user dapat melakukan logout setelah berhasil login
  it('TC-LGN-012 - Logout setelah login berhasil', () => {

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get('input[name="username"]').type('Admin');

    cy.get('input[name="password"]').type('admin123');

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard/index');

    cy.get('.oxd-userdropdown-tab').click();

    cy.get('a[href="/web/index.php/auth/logout"]')
      .should('be.visible')
      .click();

    cy.url().should('include', '/auth/login');

  });

});