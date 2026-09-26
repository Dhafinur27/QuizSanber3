class DirectoryPage {

  directoryMenu = 'Directory';
  directoryTitle = '.oxd-table-filter-title';

  employeeNameInput = 'input[placeholder="Type for hints..."]';

  searchButton = 'button[type="submit"]';
  resetButton = 'button[type="reset"]';

  jobTitleSelect = 'Job Title';
  locationSelect = 'Location';

  directoryCard = '.orangehrm-directory-card';
  employeeName = '.orangehrm-directory-card-header';
  jobTitle = '.orangehrm-directory-card-subtitle';
  location = '.orangehrm-directory-card-description';


  // Membuka menu Directory
  openDirectory() {
    cy.contains(this.directoryMenu).click();

    cy.url().should('include', '/directory/viewDirectory');

    cy.get(this.directoryTitle)
      .should('be.visible')
      .and('contain', 'Directory');
  }


  // Membuka dropdown Job Title
  openJobTitleDropdown() {
    cy.contains('.oxd-input-group', this.jobTitleSelect)
      .find('.oxd-select-text')
      .click();
  }


  // Memilih Job Title
  selectJobTitle(jobTitle) {
    cy.contains('.oxd-select-option', jobTitle)
      .click();
  }


  // Membuka dropdown Location
  openLocationDropdown() {
    cy.contains('.oxd-input-group', this.locationSelect)
      .find('.oxd-select-text')
      .click();
  }


  // Memilih Location
  selectLocation(location) {
    cy.contains('.oxd-select-option', location)
      .click();
  }


  // Mengisi Employee Name
  enterEmployeeName(name) {
    cy.get(this.employeeNameInput)
      .type(name);
  }


  // Memilih Employee dari autocomplete
  selectEmployeeName(name) {
    cy.contains('.oxd-autocomplete-option', name)
      .should('be.visible');

    cy.contains('.oxd-autocomplete-option', name)
      .click();
  }


  // Klik tombol Search
  clickSearch() {
    cy.get(this.searchButton)
      .contains('Search')
      .click();
  }


  // Klik tombol Reset
  clickReset() {
    cy.get(this.resetButton)
      .click();
  }


  // Verifikasi pilihan Job Title
  verifyJobTitleOptions() {
    cy.get('.oxd-select-option')
      .should('be.visible');
  }


  // Verifikasi nama tidak ditemukan
  verifyNoRecordsFound() {
    cy.contains('No Records Found')
      .should('be.visible');
  }


  // Verifikasi hasil berdasarkan Job Title
  verifyJobTitleResult(jobTitle) {

    cy.get(this.directoryCard)
      .should('have.length.greaterThan', 0);

    cy.get(this.directoryCard)
      .contains(this.jobTitle, jobTitle)
      .should('be.visible');
  }


  // Verifikasi hasil berdasarkan Location
  verifyLocationResult(location) {

    cy.get(this.directoryCard)
      .should('have.length.greaterThan', 0);

    cy.get(this.directoryCard)
      .contains(this.location, location)
      .should('be.visible');
  }


  // Verifikasi Employee Name dan Job Title
  verifyEmployeeAndJobTitle(name, jobTitle) {

    cy.get(this.directoryCard)
      .contains(this.employeeName, name)
      .should('be.visible');

    cy.get(this.directoryCard)
      .contains(this.jobTitle, jobTitle)
      .should('be.visible');
  }


  // Verifikasi Job Title dan Location
  verifyJobTitleAndLocation(jobTitle, location) {

    cy.get(this.directoryCard)
      .should('have.length.greaterThan', 0);

    cy.get(this.directoryCard)
      .contains(this.jobTitle, jobTitle)
      .should('be.visible');

    cy.get(this.directoryCard)
      .contains(this.location, location)
      .should('be.visible');
  }


  // Verifikasi Job Title kembali ke default
  verifyJobTitleDefault() {

    cy.contains('.oxd-input-group', this.jobTitleSelect)
      .find('.oxd-select-text-input')
      .should('have.text', '-- Select --');
  }


  // Verifikasi Location kembali ke default
  verifyLocationDefault() {

    cy.contains('.oxd-input-group', this.locationSelect)
      .find('.oxd-select-text-input')
      .should('have.text', '-- Select --');
  }

}

export default DirectoryPage;