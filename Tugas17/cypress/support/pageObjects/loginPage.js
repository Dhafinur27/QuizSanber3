class LoginPage {

  usernameInput = 'input[name="username"]';
  passwordInput = 'input[name="password"]';
  loginButton = 'button[type="submit"]';
  alertMessage = '.oxd-alert-content-text';
  errorMessage = '.oxd-input-field-error-message';

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  enterUsername(username) {
    cy.get(this.usernameInput).type(username);
  }

  enterPassword(password) {
    cy.get(this.passwordInput).type(password);
  }

  clickLogin() {
    cy.get(this.loginButton).click();
  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
  }

  verifyLoginSuccess() {
    cy.url().should('include', '/dashboard/index');
  }

  verifyInvalidCredentials() {
    cy.get(this.alertMessage)
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  }

  verifyRequiredError() {
    cy.get(this.errorMessage)
      .should('contain', 'Required');
  }

  verifyTwoRequiredErrors() {
    cy.get(this.errorMessage)
      .should('have.length', 2);
  }

  verifyPasswordHidden() {
    cy.get(this.passwordInput)
      .should('have.attr', 'type', 'password');
  }
}

export default LoginPage;