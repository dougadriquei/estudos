import { acessarSite, aguardar, clicaNoCampo } from "./util/Framework";

describe(`UC01 - Dado que estou acessando a plataforma "jsonplaceholder.typicode"`, function () {
  it(`UC01.01 - Capturar os dados exibidos na tela de listagem das Fotos e salvá-los num array JSON`, function () {
    acessarSite(Cypress.env("host"));
    aguardar(2000);
    cy.screenshot();
    cy.get('a[href*="/guide"]').then((link) => {
      cy.log(link);
      link[0].click();
    });
    cy.screenshot();
    aguardar(2000);
    clicaNoCampo('a[href="/albums/1/photos"]');
    cy.screenshot();
    cy.get("pre")
      .invoke("text")
      .then((text) => {
        const photos = JSON.parse(text);
        expect(photos).to.not.equal(undefined);
        expect(photos).to.not.equal(null);
        cy.log(photos);
        const wantedPhoto = photos.find((item) => item?.id === 6);
        cy.log(wantedPhoto);
        expect(wantedPhoto).to.not.equal(undefined);
        expect(wantedPhoto).to.not.equal(null);
        expect(wantedPhoto.id).to.equal(6);
        expect(wantedPhoto.albumId).to.equal(1);
        expect(wantedPhoto.title).to.equal(
          "accusamus ea aliquid et amet sequi nemo"
        );
        expect(wantedPhoto.url).to.equal(
          "https://via.placeholder.com/600/56a8c2"
        );
        expect(wantedPhoto.thumbnailUrl).to.equal(
          "https://via.placeholder.com/150/56a8c2"
        );
        cy.writeFile("cypress/json/wantedPhoto.json", wantedPhoto);
      });
    cy.screenshot();
  });

  it(`UC01.02 - Consultar os dados retornandos no endpoint dos Comentários filtrando por nome`, function () {
    cy.request(
      "GET",
      "https://jsonplaceholder.typicode.com/comments?name=alias odio sit"
    ).then((response) => {
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
      cy.writeFile("cypress/json/wantedComment.json", wantedComment);
    });
    cy.screenshot();
  });

  it(`UC01.03 - Enviar os dados para criação de um novo usuário`, function () {
    const payload = createBodyUser();
    cy.request(
      "POST",
      "https://jsonplaceholder.typicode.com/users",
      payload
    ).then((response) => {
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
      expect(newUser.company.catchPhrase).to.equal(
        "Coocriando Soluções Digitais"
      );
      expect(newUser.company.bs).to.equal("NKEY");
      cy.writeFile("cypress/json/newUser.json", newUser);
    });
    cy.screenshot();
  });

  it(`UC01.04 - Enviar os dados para a edição de usuário`, function () {
    const payload = updateBodyUser();
    cy.request(
      "PUT",
      "https://jsonplaceholder.typicode.com/users/5",
      payload
    ).then((response) => {
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
      cy.writeFile("cypress/json/updatedUser.json", updatedUser);
    });
    cy.screenshot();
  });
});

const createBodyUser = () => {
  return {
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
};

const updateBodyUser = () => {
  return {
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
};
