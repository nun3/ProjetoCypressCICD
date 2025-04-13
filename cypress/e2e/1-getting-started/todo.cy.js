/// <reference types="cypress" />

import { attachment } from 'allure-js-commons';
import { ContentType } from 'allure-js-commons';

function anexarTexto(nome, conteudo) {
  attachment(nome, conteudo, ContentType.TEXT);
}

function anexarImagem(nomeArquivo) {
  const caminho = `cypress/screenshots/${Cypress.spec.name}/${nomeArquivo}.png`;

  cy.screenshot(nomeArquivo).then(() => {
    cy.readFile(caminho, 'base64').then((imgBase64) => {
      attachment(nomeArquivo, Buffer.from(imgBase64, 'base64'), ContentType.PNG);
    });
  });
}

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/todo');
    anexarTexto('URL acessada', 'https://example.cypress.io/todo');
    anexarImagem('01-home-page');
  });

  it('displays two todo items by default', () => {
    cy.get('.todo-list li').should('have.length', 2);
    anexarImagem('02-todos-iniciais');

    cy.get('.todo-list li').first().should('have.text', 'Pay electric bill');
    anexarImagem('03-primeiro-item');

    cy.get('.todo-list li').last().should('have.text', 'Walk the dog');
    anexarImagem('04-ultimo-item');
  });
});
