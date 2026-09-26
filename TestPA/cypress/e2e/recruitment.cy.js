import RecruitmentPage from '../support/pageObjects/recruitmentPage';
import recruitmentData from '../fixtures/recruitmentData.json';

describe('Recruitment OrangeHRM - POM', () => {

  const recruitmentPage = new RecruitmentPage();


  // TC-REC-001
  // Membuka menu Recruitment
  it('TC-REC-001 - Membuka menu Recruitment', () => {

    cy.visit(recruitmentData.url);

    // Login
    recruitmentPage.usernameField()
      .type(recruitmentData.username);

    recruitmentPage.passwordField()
      .type(recruitmentData.password);

    recruitmentPage.loginButton()
      .click();

    // Pastikan masuk Dashboard
    cy.url({ timeout: 20000 })
      .should('include', '/dashboard/index');

    // Klik Recruitment
    recruitmentPage.recruitmentMenu()
      .click();

    // Pastikan masuk halaman Recruitment
    cy.url({ timeout: 20000 })
      .should('include', '/recruitment/viewCandidates');

  });


  // TC-REC-002
  // Membuka halaman Candidates
  it('TC-REC-002 - Membuka halaman Candidates', () => {

    cy.visit(recruitmentData.url);

    // Login
    recruitmentPage.usernameField()
      .type(recruitmentData.username);

    recruitmentPage.passwordField()
      .type(recruitmentData.password);

    recruitmentPage.loginButton()
      .click();

    cy.url({ timeout: 20000 })
      .should('include', '/dashboard/index');

    // Klik Recruitment
    recruitmentPage.recruitmentMenu()
      .click();

    cy.url({ timeout: 20000 })
      .should('include', '/recruitment/viewCandidates');

    // Pastikan halaman Candidates tampil
    recruitmentPage.candidatesTitle()
      .should('be.visible');

    recruitmentPage.candidateNameField()
      .should('be.visible');

    recruitmentPage.searchButton()
      .should('be.visible');

    recruitmentPage.resetButton()
      .should('be.visible');

  });


  // TC-REC-003
  // Membuka halaman Vacancies
  it('TC-REC-003 - Membuka halaman Vacancies', () => {

    cy.visit(recruitmentData.url);

    // Login
    recruitmentPage.usernameField()
      .type(recruitmentData.username);

    recruitmentPage.passwordField()
      .type(recruitmentData.password);

    recruitmentPage.loginButton()
      .click();

    cy.url({ timeout: 20000 })
      .should('include', '/dashboard/index');

    // Klik Recruitment
    recruitmentPage.recruitmentMenu()
      .click();

    cy.url({ timeout: 20000 })
      .should('include', '/recruitment/viewCandidates');

    // Klik Vacancies
    recruitmentPage.vacanciesMenu()
      .click();

    // Pastikan masuk halaman Vacancies
    cy.url({ timeout: 20000 })
      .should('include', '/recruitment/viewJobVacancy');

  });


  // TC-REC-004
  // Search Candidates tanpa filter
  it('TC-REC-004 - Search Candidates tanpa filter', () => {

    cy.visit(recruitmentData.url);

    // Login
    recruitmentPage.usernameField()
      .type(recruitmentData.username);

    recruitmentPage.passwordField()
      .type(recruitmentData.password);

    recruitmentPage.loginButton()
      .click();

    cy.url({ timeout: 20000 })
      .should('include', '/dashboard/index');

    // Masuk Recruitment
    recruitmentPage.recruitmentMenu()
      .click();

    cy.url({ timeout: 20000 })
      .should('include', '/recruitment/viewCandidates');

    // Intercept API Candidates
    cy.intercept(
      'GET',
      '**/api/v2/recruitment/candidates*'
    ).as('getCandidates');

    // Search
    recruitmentPage.searchButton()
      .click();

    // Validasi API
    cy.wait('@getCandidates', { timeout: 20000 })
      .its('response.statusCode')
      .should('eq', 200);

    // Pastikan tabel tampil
    recruitmentPage.candidateTable()
      .should('be.visible');

  });


  // TC-REC-005
  // Pencarian nama kandidat dengan data fiktif
  it('TC-REC-005 - Pencarian nama kandidat dengan data fiktif', () => {

    cy.visit(recruitmentData.url);

    // Login
    recruitmentPage.usernameField()
      .type(recruitmentData.username);

    recruitmentPage.passwordField()
      .type(recruitmentData.password);

    recruitmentPage.loginButton()
      .click();

    cy.url({ timeout: 20000 })
      .should('include', '/dashboard/index');

    // Masuk Recruitment
    recruitmentPage.recruitmentMenu()
      .click();

    cy.url({ timeout: 20000 })
      .should('include', '/recruitment/viewCandidates');

    // Intercept API Candidate Name
    cy.intercept(
      'GET',
      '**/api/v2/recruitment/candidates?candidateName=*'
    ).as('searchCandidate');

    // Isi nama fiktif
    recruitmentPage.candidateNameField()
      .type(recruitmentData.fakeCandidate);

    // Validasi API
    cy.wait('@searchCandidate', { timeout: 20000 })
      .its('response.statusCode')
      .should('eq', 200);

    // Pastikan tidak ada data
    recruitmentPage.noRecordsFound()
      .should('be.visible');

  });


  // TC-REC-006
  // Pencarian kandidat berdasarkan Job Title
  it('TC-REC-006 - Pencarian kandidat berdasarkan Job Title', () => {

    cy.visit(recruitmentData.url);

    // Login
    recruitmentPage.usernameField()
      .type(recruitmentData.username);

    recruitmentPage.passwordField()
      .type(recruitmentData.password);

    recruitmentPage.loginButton()
      .click();

    cy.url({ timeout: 20000 })
      .should('include', '/dashboard/index');

    // Masuk Recruitment
    recruitmentPage.recruitmentMenu()
      .click();

    cy.url({ timeout: 20000 })
      .should('include', '/recruitment/viewCandidates');

    // Pilih Job Title
    recruitmentPage.jobTitleDropdown()
      .click();

    recruitmentPage.jobTitleOption(
      recruitmentData.jobTitle
    ).click();

    // Pastikan Job Title terpilih
    recruitmentPage.jobTitleDropdown()
      .should('have.text', recruitmentData.jobTitle);

    // Intercept API Job Title
    cy.intercept(
      'GET',
      '**/api/v2/recruitment/candidates*jobTitleId=*'
    ).as('getCandidatesByJobTitle');

    // Search
    recruitmentPage.searchButton()
      .click();

    // Validasi API
    cy.wait('@getCandidatesByJobTitle', { timeout: 20000 })
      .then((interception) => {

        expect(interception.response.statusCode)
          .to.equal(200);

        expect(interception.request.url)
          .to.include('jobTitleId=25');

      });

  });


  // TC-REC-007
  // Pencarian kandidat berdasarkan Vacancy
  it('TC-REC-007 - Pencarian kandidat berdasarkan Vacancy', () => {

    cy.visit(recruitmentData.url);

    // Login
    recruitmentPage.usernameField()
      .type(recruitmentData.username);

    recruitmentPage.passwordField()
      .type(recruitmentData.password);

    recruitmentPage.loginButton()
      .click();

    cy.url({ timeout: 20000 })
      .should('include', '/dashboard/index');

    // Masuk Recruitment
    recruitmentPage.recruitmentMenu()
      .click();

    cy.url({ timeout: 20000 })
      .should('include', '/recruitment/viewCandidates');

    // Pilih Vacancy
    recruitmentPage.vacancyDropdown()
      .click();

    recruitmentPage.vacancyOption(
      recruitmentData.vacancy
    ).click();

    // Pastikan Vacancy terpilih
    recruitmentPage.vacancyDropdown()
      .should('have.text', recruitmentData.vacancy);

    // Intercept API Vacancy
    cy.intercept(
      'GET',
      '**/api/v2/recruitment/candidates*vacancyId=*'
    ).as('getCandidatesByVacancy');

    // Search
    recruitmentPage.searchButton()
      .click();

    // Validasi API
    cy.wait('@getCandidatesByVacancy', { timeout: 20000 })
      .then((interception) => {

        expect(interception.response.statusCode)
          .to.equal(200);

        expect(interception.request.url)
          .to.include('vacancyId=');

      });

  });


  // TC-REC-008
  // Pencarian kandidat berdasarkan Status
  it('TC-REC-008 - Pencarian kandidat berdasarkan Status', () => {

    cy.visit(recruitmentData.url);

    // Login
    recruitmentPage.usernameField()
      .type(recruitmentData.username);

    recruitmentPage.passwordField()
      .type(recruitmentData.password);

    recruitmentPage.loginButton()
      .click();

    cy.url({ timeout: 20000 })
      .should('include', '/dashboard/index');

    // Masuk Recruitment
    recruitmentPage.recruitmentMenu()
      .click();

    cy.url({ timeout: 20000 })
      .should('include', '/recruitment/viewCandidates');

    // Pilih Status
    recruitmentPage.statusDropdown()
      .click();

    recruitmentPage.statusOption(
      recruitmentData.status
    ).click();

    // Pastikan Status terpilih
    recruitmentPage.statusDropdown()
      .should('have.text', recruitmentData.status);

    // Intercept API Status
    cy.intercept(
      'GET',
      '**/api/v2/recruitment/candidates*status=*'
    ).as('getCandidatesByStatus');

    // Search
    recruitmentPage.searchButton()
      .click();

    // Validasi API
    cy.wait('@getCandidatesByStatus', { timeout: 20000 })
      .then((interception) => {

        expect(interception.response.statusCode)
          .to.equal(200);

        expect(interception.request.url)
          .to.include('status=');

      });

  });

});