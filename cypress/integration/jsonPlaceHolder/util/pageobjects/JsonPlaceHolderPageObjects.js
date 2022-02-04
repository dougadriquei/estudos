import { salvaArquivo } from "../Framework";

export const LINK_GUIDE = 'a[href*="/guide"]';
export const LINK_PHOTOS = 'a[href="/albums/1/photos"]';
export const ENV = "host";
export const URL_GET = Cypress.env(ENV) + "comments?name=alias odio sit";
export const URL_POST = Cypress.env(ENV) + "users";
export const URL_PUT = Cypress.env(ENV) + "users/5";

export const UC01 = `UC01 - Dado que estou acessando o site "jsonplaceholder"`;
export const UC0101 = `UC01.01 - Quando acessar a tela de listagem de Fotos, desejo encontrar a foto de código "6" para conferir suas informações`;

export const UC02 = `UC02 - Dado que estou fazendo requisições para a API do site "jsonplaceholder"`;
export const UC0201 = `UC02.01 - Quando consultar os Comentários, quero ter a flexibilidade filtrar as fotos pelo seus nomes para em seguinda validar suas informações`;
export const UC0202 = `UC02.02 - Quando cadastrar um Usuário, quero confirmar o sucesso da operação`;
export const UC0203 = `UC02.03 - Quando atualizar um Usuário, desejo checar o sucesso da requisição`;

export function validaResultadoEsperadoUC0101(wantedPhoto) {
  const formValues = populateForm();
  cy.log(wantedPhoto);
  expect(wantedPhoto).to.not.equal(undefined);
  expect(wantedPhoto).to.not.equal(null);
  expect(wantedPhoto.id).to.equal(formValues.id);
  expect(wantedPhoto.albumId).to.equal(1);
  expect(wantedPhoto.title).to.equal("accusamus ea aliquid et amet sequi nemo");
  expect(wantedPhoto.url).to.equal("https://via.placeholder.com/600/56a8c2");
  expect(wantedPhoto.thumbnailUrl).to.equal(
    "https://via.placeholder.com/150/56a8c2"
  );
  salvaArquivo("cypress/json/wantedPhoto.json", wantedPhoto);
}

export function validaResultadoEsperadoUC0201(response) {
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

export function validaResultadoEsperadoUC0202(response) {
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

export function validaResultadoEsperadoUC0203(response) {
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

const populateForm = () => {
  const formValues = {
    id: 6,
  };
  return formValues;
};
