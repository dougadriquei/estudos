export function acessarSite(url) {
  cy.visit(url);
}

export function preencheCampo(reference, value, options) {
  if (options) {
    cy.get(reference).type(value, options);
    return;
  }
  cy.get(reference).type(value);
}

export function limpaPreencheCampo(reference, value) {
  cy.get(reference).clear().type(value);
}

export function selecionaCampo(reference, value) {
  cy.get(reference).select(value);
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

// Ex: options = { force: true, multiple: true}
export function clicaNoCampoVerificandoValor(reference, value, options) {
  if (options) {
    cy.get(reference).contains(value).click(options);
    return;
  }
  cy.get(reference).contains(value).click();
}

export function carregarArquivo(reference, files) {
  cy.get(reference).attachFile(files);
}

export function verificaCampo(reference, value) {
  cy.get(reference).contains(value);
}

export function verificaCampoVisivel(reference, value) {
  cy.get(reference).contains(value).should("be.visible");
}
// Ex: options = { ensureScrollable: false }
export function moverScroll(x, y, options) {
  if (options) {
    cy.scrollTo(x, y, options);
    return;
  }
  cy.scrollTo(x, y);
}

export function moverScrollPorPosicao(position) {
  cy.scrollTo(position);
}

export function voltar() {
  cy.go("back");
}

// XPATH FUNCTIONS

export function preencheCampoXPath(reference, value, options) {
  if (options) {
    cy.xpath(reference).type(value, options);
    return;
  }
  cy.xpath(reference).type(value);
}

export function verificaCampoXPath(reference, value) {
  cy.xpath(reference).contains(value);
}

// Ex: options = { force: true, multiple: true}
export function clicaNoCampoXPath(reference, options) {
  if (options) {
    cy.xpath(reference).click(options);
    return;
  }
  cy.xpath(reference).click();
}

export function selecionaCampoXPath(reference, value) {
  cy.xpath(reference).select(value);
}

export function carregarArquivoXPath(reference, files) {
  cy.xpath(reference).attachFile(files);
}

export function limpaPreencheCampoXPath(reference, value, options) {
  if (options) {
    cy.xpath(reference).clear(options).type(value, options);
    return;
  }
  cy.xpath(reference).clear().type(value);
}

export function verificaCampoVisivelXPath(reference, value) {
  cy.xpath(reference).contains(value).should("be.visible");
}
