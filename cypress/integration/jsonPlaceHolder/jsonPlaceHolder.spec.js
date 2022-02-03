import {
  acessarSite,
  aguardar,
  clicaNoCampo,
  capturarTela,
  clicarPrimeiroObjetoEncontrado,
  salvaArquivo,
} from "./util/Framework";

const LINK_GUIDE = 'a[href*="/guide"]';
const LINK_PHOTOS = 'a[href="/albums/1/photos"]';
const ENV = "host";
const URL_GET = Cypress.env(ENV) + "/comments?name=alias odio sit";
const URL_POST = Cypress.env(ENV) + "/users";
const URL_PUT = Cypress.env(ENV) + "/users/5";
const codigoFoto = 6;

const UC0101 = `UC01.01 - Quando acessar a tela de listagem de Fotos, desejo encontrar a foto de código "6" para conferir suas informações`;
const UC0201 = `UC02.01 - Quando consultar os Comentários, quero ter a flexibilidade filtrar as fotos pelo seus nomes para em seguinda validar suas informações`;
const UC0202 = `UC02.02 - Quando cadastrar um Usuário, quero confirmar o sucesso da operação`;
const UC0203 = `UC02.03 - Quando atualizar um Usuário, desejo checar o sucesso da requisição`;

describe(`UC01 - Dado que estou acessando o site "jsonplaceholder"`, function () {
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

describe(`UC02 - Dado que estou fazendo requisições para a API do site "jsonplaceholder"`, function () {
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

function validaResultadoEsperadoUC0101(wantedPhoto) {
  cy.log(wantedPhoto);
  expect(wantedPhoto).to.not.equal(undefined);
  expect(wantedPhoto).to.not.equal(null);
  expect(wantedPhoto.id).to.equal(6);
  expect(wantedPhoto.albumId).to.equal(1);
  expect(wantedPhoto.title).to.equal("accusamus ea aliquid et amet sequi nemo");
  expect(wantedPhoto.url).to.equal("https://via.placeholder.com/600/56a8c2");
  expect(wantedPhoto.thumbnailUrl).to.equal(
    "https://via.placeholder.com/150/56a8c2"
  );
  salvaArquivo("cypress/json/wantedPhoto.json", wantedPhoto);
}

function validaResultadoEsperadoUC0201(response) {
  expect(response.status).to.equal(200);
  const comments = response.body;
  expect(comments).to.not.equal(undefined);
  expect(comments).to.not.equal(null);
  expect(comments[0]).to.not.equal(undefined);
  expect(comments[0]).to.not.equal(null);
  const wantedComment = comments[0];
  expect(wantedComment).to.not.equal(null);
  expect(wantedComment).to.not.equal(undefined);
  expect(wantedComment.id).to.equal(4);
  expect(wantedComment.postId).to.equal(1);
  expect(wantedComment.name).to.equal("alias odio sit");
  expect(wantedComment.email).to.equal("Lew@alysha.tv");
  expect(wantedComment.body).to.equal(
    "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati"
  );
  salvaArquivo("cypress/json/wantedComment.json", wantedComment);
}

function validaResultadoEsperadoUC0202(response) {
  expect(response.status).to.equal(201);
  const newUser = response.body;
  expect(newUser).to.not.equal(undefined);
  expect(newUser).to.not.equal(null);
  expect(newUser.id).to.equal(11);
  expect(newUser.name).to.equal("Douglas Adriano Queiroz");
  expect(newUser.username).to.equal("dougaq");
  expect(newUser.email).to.equal("dougaq@gmail.com");
  expect(newUser.address).to.not.equal(undefined);
  expect(newUser.address).to.not.equal(null);
  expect(newUser.address.street).to.equal("Rod. João Paulo 692");
  expect(newUser.address.suite).to.equal("D");
  expect(newUser.address.city).to.equal("Florianópolis");
  expect(newUser.address.zipcode).to.equal("88030-300");
  expect(newUser.address.geo).to.not.equal(null);
  expect(newUser.address.geo).to.not.equal(undefined);
  expect(newUser.address.geo.lat).to.equal("-27.593500");
  expect(newUser.address.geo.lng).to.equal("-48.558540");
  expect(newUser.phone).to.equal("(48) 999886724");
  expect(newUser.website).to.equal(
    "https://www.linkedin.com/in/douglas-queiroz-680b1978/"
  );
  expect(newUser.company).to.not.equal(null);
  expect(newUser.company).to.not.equal(undefined);
  expect(newUser.company.name).to.equal("NKEY");
  expect(newUser.company.catchPhrase).to.equal("Coocriando Soluções Digitais");
  expect(newUser.company.bs).to.equal("NKEY");
  salvaArquivo("cypress/json/newUser.json", newUser);
}

function validaResultadoEsperadoUC0203(response) {
  expect(response.status).to.equal(200);
  const updatedUser = response.body;
  expect(updatedUser).to.not.equal(undefined);
  expect(updatedUser).to.not.equal(null);
  expect(updatedUser.id).to.equal(5);
  expect(updatedUser.name).to.equal("Douglas Adriano Queiroz Alterado");
  expect(updatedUser.username).to.equal("dougaq");
  expect(updatedUser.email).to.equal("dougaq@gmail.com");
  expect(updatedUser.address).to.not.equal(undefined);
  expect(updatedUser.address).to.not.equal(null);
  expect(updatedUser.address.street).to.equal("Rod. João Paulo 692");
  expect(updatedUser.address.suite).to.equal("D");
  expect(updatedUser.address.city).to.equal("Florianópolis");
  expect(updatedUser.address.zipcode).to.equal("88030-300");
  expect(updatedUser.address.geo).to.not.equal(null);
  expect(updatedUser.address.geo).to.not.equal(undefined);
  expect(updatedUser.address.geo.lat).to.equal("-27.593522");
  expect(updatedUser.address.geo.lng).to.equal("-48.558522");
  expect(updatedUser.phone).to.equal("(48) 999886724");
  expect(updatedUser.website).to.equal(
    "https://www.linkedin.com/in/douglas-queiroz-680b1978/"
  );
  expect(updatedUser.company).to.not.equal(null);
  expect(updatedUser.company).to.not.equal(undefined);
  expect(updatedUser.company.name).to.equal("NKEY");
  expect(updatedUser.company.catchPhrase).to.equal(
    "Coocriando Soluções Digitais"
  );
  expect(updatedUser.company.bs).to.equal("NKEY");
  salvaArquivo("cypress/json/updatedUser.json", updatedUser);
}
