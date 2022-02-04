import {
  acessarSite,
  aguardar,
  clicaNoCampo,
  capturarTela,
  clicarPrimeiroObjetoEncontrado,
} from "./util/Framework";

import {
  validaResultadoEsperadoUC0101,
  validaResultadoEsperadoUC0201,
  validaResultadoEsperadoUC0202,
  validaResultadoEsperadoUC0203,
  LINK_GUIDE,
  LINK_PHOTOS,
  ENV,
  URL_GET,
  URL_POST,
  URL_PUT,
  UC01,
  UC0101,
  UC02,
  UC0201,
  UC0202,
  UC0203,
} from "./util/pageobjects/JsonPlaceHolderPageObjects";

describe(UC01, function () {
  it(UC0101, function () {
    try {
      acessarSite(Cypress.env(ENV));
      aguardar(2000);
      capturarTela();
      clicarPrimeiroObjetoEncontrado(LINK_GUIDE);
      capturarTela();
      aguardar(2000);
      clicaNoCampo(LINK_PHOTOS);
      capturarTela();
      cy.get("pre")
        .as("Fotos")
        .invoke("text")
        .then((fotos) => {
          const foto = JSON.parse(fotos).find((foto) => foto.id === 6);
          expect(foto).to.not.equal(undefined);
          expect(foto).to.not.equal(null);
          validaResultadoEsperadoUC0101(foto);
        });
      capturarTela();
    } catch (e) {
      throw new Error("Erro: " + e.message);
    }
  });
});

describe(UC02, function () {
  it(UC0201, function () {
    try {
      cy.request("GET", URL_GET).then((response) => {
        validaResultadoEsperadoUC0201(response);
      });
      capturarTela();
    } catch (e) {
      throw new Error("Erro: " + e.message);
    }
  });

  it(UC0202, function () {
    try {
      const payload = {
        name: "Douglas Adriano Queiroz",
        username: "dougaq",
        email: "dougaq@gmail.com",
        address: {
          street: "Rod. João Paulo 692",
          suite: "D",
          city: "Florianópolis",
          zipcode: "88030-300",
          geo: {
            lat: "-27.593500",
            lng: "-48.558540",
          },
        },
        phone: "(48) 999886724",
        website: "https://www.linkedin.com/in/douglas-queiroz-680b1978/",
        company: {
          name: "NKEY",
          catchPhrase: "Coocriando Soluções Digitais",
          bs: "NKEY",
        },
      };

      cy.request("POST", URL_POST, payload).then((response) => {
        validaResultadoEsperadoUC0202(response);
      });
      capturarTela();
    } catch (e) {
      throw new Error("Erro: " + e.message);
    }
  });

  it(UC0203, function () {
    try {
      const payload = {
        id: 5,
        name: "Douglas Adriano Queiroz Alterado",
        username: "dougaq",
        email: "dougaq@gmail.com",
        address: {
          street: "Rod. João Paulo 692",
          suite: "D",
          city: "Florianópolis",
          zipcode: "88030-300",
          geo: {
            lat: "-27.593522",
            lng: "-48.558522",
          },
        },
        phone: "(48) 999886724",
        website: "https://www.linkedin.com/in/douglas-queiroz-680b1978/",
        company: {
          name: "NKEY",
          catchPhrase: "Coocriando Soluções Digitais",
          bs: "NKEY",
        },
      };

      cy.request("PUT", URL_PUT, payload).then((response) => {
        validaResultadoEsperadoUC0203(response);
      });
      capturarTela();
    } catch (e) {
      throw new Error("Erro: " + e.message);
    }
  });
});
