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

export function capturarTela() {
  cy.screenshot();
}

export function clicarPrimeiroObjetoEncontrado(reference, options) {
  if (options) {
    cy.get(reference).then((link) => {
      cy.log(link);
      link[0].click(options);
    });
    return;
  }
  cy.get(reference).then((link) => {
    cy.log(link);
    link[0].click(options);
  });
}

export function salvaArquivo(pathname, object) {
  cy.writeFile(pathname, object);
}
