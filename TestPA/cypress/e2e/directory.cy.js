import LoginPage from '../support/pageObjects/loginPage';
import DirectoryPage from '../support/pageObjects/directoryPage';

describe('Directory OrangeHRM - POM', () => {

  const loginPage = new LoginPage();
  const directoryPage = new DirectoryPage();

  let loginData;
  let directoryData;


  before(() => {

    cy.fixture('loginData').then((data) => {
      loginData = data;
    });

    cy.fixture('directoryData').then((data) => {
      directoryData = data;
    });

  });


  // TC-DIR-001
  // Memastikan user dapat membuka menu Directory
  it('TC-DIR-001 - Membuka menu Directory', () => {

    loginPage.visit();

    loginPage.login(
      loginData.validLogin.username,
      loginData.validLogin.password
    );

    loginPage.verifyLoginSuccess();

    // Intercept request saat halaman Directory dibuka
    cy.intercept(
      'GET',
      '**/api/v2/directory/employees*'
    ).as('getDirectory');

    directoryPage.openDirectory();

    cy.wait('@getDirectory')
      .its('response.statusCode')
      .should('eq', 200);

  });


  // TC-DIR-002
  // Memastikan form pencarian dapat dikembalikan ke kondisi default
  it('TC-DIR-002 - Reset form pencarian', () => {

    loginPage.visit();

    loginPage.login(
      loginData.validLogin.username,
      loginData.validLogin.password
    );

    loginPage.verifyLoginSuccess();

    directoryPage.openDirectory();

    directoryPage.openJobTitleDropdown();

    directoryPage.selectJobTitle(
      directoryData.jobTitle
    );

    directoryPage.openLocationDropdown();

    directoryPage.selectLocation(
      directoryData.location
    );

    directoryPage.clickReset();

    directoryPage.verifyJobTitleDefault();

    directoryPage.verifyLocationDefault();

  });


  // TC-DIR-003
  // Memastikan dropdown Job Title menampilkan pilihan yang tersedia
  it('TC-DIR-003 - Mengecek opsi dropdown Job Title', () => {

    loginPage.visit();

    loginPage.login(
      loginData.validLogin.username,
      loginData.validLogin.password
    );

    loginPage.verifyLoginSuccess();

    directoryPage.openDirectory();

    directoryPage.openJobTitleDropdown();

    directoryPage.verifyJobTitleOptions();

  });


  // TC-DIR-004
  // Memastikan pencarian nama yang tidak ditemukan menampilkan No Records Found
  it('TC-DIR-004 - Pencarian dengan nama tidak valid', () => {

    loginPage.visit();

    loginPage.login(
      loginData.validLogin.username,
      loginData.validLogin.password
    );

    loginPage.verifyLoginSuccess();

    directoryPage.openDirectory();

    // Intercept request autocomplete Employee Name
    cy.intercept(
      'GET',
      '**/api/v2/directory/employees*'
    ).as('searchEmployee');

    directoryPage.enterEmployeeName(
      directoryData.invalidName
    );

    cy.wait('@searchEmployee').then((interception) => {

      expect(interception.response.statusCode)
        .to.eq(200);

      expect(interception.request.url)
        .to.include('nameOrId=ZZZZZ+Not+Found');

    });

    directoryPage.verifyNoRecordsFound();

  });


  // TC-DIR-005
  // Memastikan pencarian berdasarkan Job Title menampilkan hasil yang sesuai
  it('TC-DIR-005 - Pencarian berdasarkan Job Title', () => {

    loginPage.visit();

    loginPage.login(
      loginData.validLogin.username,
      loginData.validLogin.password
    );

    loginPage.verifyLoginSuccess();

    directoryPage.openDirectory();

    directoryPage.openJobTitleDropdown();

    directoryPage.selectJobTitle(
      directoryData.jobTitle
    );

    // Intercept request pencarian Directory
    cy.intercept(
      'GET',
      '**/api/v2/directory/employees*'
    ).as('searchDirectory');

    directoryPage.clickSearch();

    cy.wait('@searchDirectory').then((interception) => {

      expect(interception.response.statusCode)
        .to.eq(200);

      expect(interception.request.url)
        .to.include('jobTitleId=9');

    });

    directoryPage.verifyJobTitleResult(
      directoryData.jobTitle
    );

  });


  // TC-DIR-006
  // Memastikan pencarian berdasarkan Location menampilkan hasil yang sesuai
  it('TC-DIR-006 - Pencarian berdasarkan Location', () => {

    loginPage.visit();

    loginPage.login(
      loginData.validLogin.username,
      loginData.validLogin.password
    );

    loginPage.verifyLoginSuccess();

    directoryPage.openDirectory();

    directoryPage.openLocationDropdown();

    directoryPage.selectLocation(
      directoryData.location
    );

    // Intercept request pencarian Directory
    cy.intercept(
      'GET',
      '**/api/v2/directory/employees*'
    ).as('searchDirectory');

    directoryPage.clickSearch();

    cy.wait('@searchDirectory').then((interception) => {

      expect(interception.response.statusCode)
        .to.eq(200);

      expect(interception.request.url)
        .to.include('locationId=5');

    });

    directoryPage.verifyLocationResult(
      directoryData.location
    );

  });


  // TC-DIR-007
  // Memastikan pencarian berdasarkan Employee Name dan Job Title
  it('TC-DIR-007 - Pencarian dengan Name & Job Title', () => {

    loginPage.visit();

    loginPage.login(
      loginData.validLogin.username,
      loginData.validLogin.password
    );

    loginPage.verifyLoginSuccess();

    directoryPage.openDirectory();

    directoryPage.enterEmployeeName(
      directoryData.employeeSearch
    );

    directoryPage.selectEmployeeName(
      directoryData.employeeName
    );

    directoryPage.openJobTitleDropdown();

    directoryPage.selectJobTitle(
      directoryData.jobTitle
    );

    // Intercept request pencarian Directory
    cy.intercept(
      'GET',
      '**/api/v2/directory/employees*'
    ).as('searchDirectory');

    directoryPage.clickSearch();

    cy.wait('@searchDirectory').then((interception) => {

      expect(interception.response.statusCode)
        .to.eq(200);

      expect(interception.request.url)
        .to.include('empNumber=11');

      expect(interception.request.url)
        .to.include('jobTitleId=9');

    });

    directoryPage.verifyEmployeeAndJobTitle(
      directoryData.employeeName,
      directoryData.jobTitle
    );

  });


  // TC-DIR-008
  // Memastikan pencarian berdasarkan Job Title dan Location
  it('TC-DIR-008 - Pencarian dengan Job Title & Location', () => {

    loginPage.visit();

    loginPage.login(
      loginData.validLogin.username,
      loginData.validLogin.password
    );

    loginPage.verifyLoginSuccess();

    directoryPage.openDirectory();

    directoryPage.openJobTitleDropdown();

    directoryPage.selectJobTitle(
      directoryData.jobTitle
    );

    directoryPage.openLocationDropdown();

    directoryPage.selectLocation(
      directoryData.location
    );

    // Intercept request pencarian Directory
    cy.intercept(
      'GET',
      '**/api/v2/directory/employees*'
    ).as('searchDirectory');

    directoryPage.clickSearch();

    cy.wait('@searchDirectory').then((interception) => {

      expect(interception.response.statusCode)
        .to.eq(200);

      expect(interception.request.url)
        .to.include('locationId=5');

      expect(interception.request.url)
        .to.include('jobTitleId=9');

    });

    directoryPage.verifyJobTitleAndLocation(
      directoryData.jobTitle,
      directoryData.location
    );

  });

});