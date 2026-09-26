import LoginPage from '../support/pageObjects/loginPage';

describe('Login OrangeHRM - POM', () => {

  const loginPage = new LoginPage();

  let loginData;

  before(() => {
    cy.fixture('loginData').then((data) => {
      loginData = data;
    });
  });

  // TC-LGN-001
  // Memastikan user dapat login menggunakan username dan password yang valid
  // serta memastikan request Dashboard berhasil
  it('TC-LGN-001 - Login menggunakan username dan password valid', () => {

    cy.intercept(
      'GET',
      '**/api/v2/dashboard/employees/action-summary'
    ).as('dashboard');

    loginPage.visit();

    loginPage.login(
      loginData.validLogin.username,
      loginData.validLogin.password
    );

    cy.wait('@dashboard')
      .its('response.statusCode')
      .should('eq', 200);

    loginPage.verifyLoginSuccess();
  });

  // TC-LGN-002
  // Memastikan login ditolak jika password yang digunakan salah
  it('TC-LGN-002 - Login menggunakan username valid dan password salah', () => {

    loginPage.visit();

    loginPage.login(
      loginData.invalidPassword.username,
      loginData.invalidPassword.password
    );

    loginPage.verifyInvalidCredentials();
  });

  // TC-LGN-003
  // Memastikan login ditolak jika username yang digunakan salah
  it('TC-LGN-003 - Login menggunakan username salah dan password valid', () => {

    loginPage.visit();

    loginPage.login(
      loginData.invalidUsername.username,
      loginData.invalidUsername.password
    );

    loginPage.verifyInvalidCredentials();
  });

  // TC-LGN-004
  // Memastikan sistem menampilkan pesan Required jika username dan password kosong
  it('TC-LGN-004 - Login dengan username dan password kosong', () => {

    loginPage.visit();

    loginPage.clickLogin();

    loginPage.verifyTwoRequiredErrors();
  });

  // TC-LGN-005
  // Memastikan sistem meminta username jika field username kosong
  it('TC-LGN-005 - Login dengan username kosong dan password terisi', () => {

    loginPage.visit();

    loginPage.enterPassword(
      loginData.emptyUsername.password
    );

    loginPage.clickLogin();

    loginPage.verifyRequiredError();
  });

  // TC-LGN-006
  // Memastikan sistem meminta password jika field password kosong
  it('TC-LGN-006 - Login dengan username terisi dan password kosong', () => {

    loginPage.visit();

    loginPage.enterUsername(
      loginData.emptyPassword.username
    );

    loginPage.clickLogin();

    loginPage.verifyRequiredError();
  });

  // TC-LGN-007
  // Memastikan password ditampilkan sebagai karakter tersembunyi
  it('TC-LGN-007 - Memastikan password ditampilkan sebagai karakter tersembunyi', () => {

    loginPage.visit();

    loginPage.enterPassword(
      loginData.validLogin.password
    );

    loginPage.verifyPasswordHidden();
  });

  // TC-LGN-008
  // Memastikan username dengan spasi di awal dan akhir tidak dapat digunakan untuk login
  it('TC-LGN-008 - Login menggunakan username dengan spasi di awal dan akhir', () => {

    loginPage.visit();

    loginPage.login(
      loginData.usernameWithSpace.username,
      loginData.usernameWithSpace.password
    );

    loginPage.verifyInvalidCredentials();
  });

});