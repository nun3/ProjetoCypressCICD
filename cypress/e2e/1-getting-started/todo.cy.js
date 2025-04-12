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

  it('can add new todo items', () => {
    const newItem = 'Feed the cat';
    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`);
    anexarImagem('05-adicionando-novo-item');

    cy.get('.todo-list li')
      .should('have.length', 3)
      .last()
      .should('have.text', newItem);
  });

  it('can check off an item as completed', () => {
    cy.contains('Pay electric bill')
      .parent()
      .find('input[type=checkbox]')
      .check();
    anexarImagem('06-item-completado');

    cy.contains('Pay electric bill')
      .parents('li')
      .should('have.class', 'completed');
  });

  context('with a checked task', () => {
    beforeEach(() => {
      cy.contains('Pay electric bill')
        .parent()
        .find('input[type=checkbox]')
        .check();
    });

    it('can filter for uncompleted tasks', () => {
      cy.contains('Active').click();
      anexarImagem('07-filtrando-ativos');

      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Walk the dog');

      cy.contains('Pay electric bill').should('not.exist');
    });

    it('can filter for completed tasks', () => {
      cy.contains('Completed').click();
      anexarImagem('08-filtrando-completos');

      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Pay electric bill');

      cy.contains('Walk the dog').should('not.exist');
    });

    it('can delete all completed tasks', () => {
      cy.contains('Clear completed').click();
      anexarImagem('09-limpar-completados');

      cy.get('.todo-list li')
        .should('have.length', 1)
        .should('not.have.text', 'Pay electric bill');

      cy.contains('Clear completed').should('not.exist');
    });
  });
});
