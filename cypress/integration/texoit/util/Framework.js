export function acessarSite(url) {
  cy.visit(url);
}

export function aguardar(value) {
  cy.wait(value);
}

// Ex: options = { force: true, multiple: true}
export function clicaNoCampo(reference, options) {
  if (options) {
    cy.get(reference).click(options);
    return;
  }
  cy.get(reference).click();
}
