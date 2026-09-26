class RecruitmentPage {

  // Login
  usernameField() {
    return cy.get('input[name="username"]');
  }

  passwordField() {
    return cy.get('input[name="password"]');
  }

  loginButton() {
    return cy.get('button[type="submit"]');
  }

  // Recruitment menu
  recruitmentMenu() {
    return cy.contains('Recruitment', { timeout: 20000 });
  }

  // Recruitment top menu
  vacanciesMenu() {
    return cy.contains(
      'a.oxd-topbar-body-nav-tab-item',
      'Vacancies',
      { timeout: 20000 }
    );
  }

  // Candidates
  candidatesTitle() {
    return cy.contains('h5', 'Candidates', { timeout: 20000 });
  }

  candidateNameField() {
    return cy.get('input[placeholder="Type for hints..."]');
  }

  searchButton() {
    return cy.get('button[type="submit"]');
  }

  resetButton() {
    return cy.get('button[type="reset"]');
  }

  // Job Title
  jobTitleDropdown() {
    return cy.contains('label', 'Job Title')
      .parent()
      .parent()
      .find('.oxd-select-text-input');
  }

  jobTitleOption(jobTitle) {
    return cy.contains('.oxd-select-option', jobTitle);
  }

  // Vacancy
  vacancyDropdown() {
    return cy.contains('label', 'Vacancy')
      .parent()
      .parent()
      .find('.oxd-select-text-input');
  }

  vacancyOption(vacancy) {
    return cy.contains('.oxd-select-option', vacancy);
  }

  // Status
  statusDropdown() {
    return cy.contains('label', 'Status')
      .parent()
      .parent()
      .find('.oxd-select-text-input');
  }

  statusOption(status) {
    return cy.contains('.oxd-select-option', status);
  }

  // Candidate result
  noRecordsFound() {
    return cy.contains('No Records Found', { timeout: 20000 });
  }

  candidateTable() {
    return cy.get('.oxd-table-body', { timeout: 20000 });
  }

}

export default RecruitmentPage;