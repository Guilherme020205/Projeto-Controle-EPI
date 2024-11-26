/// <reference types="cypress" />

describe('Login Principal', () => {
    
    it('Fazer login com usuário incorreto', () => {
        cy.visit('http://localhost:5173/')
        cy.get('[type="email"]').click().type('carlos@gmail.com') 
        cy.get('[type="password"]').click().type('admin1') 
        cy.get('button').click()
    });

    it('Fazer login com senha incorreta', () => {
        cy.visit('http://localhost:5173/')
        cy.get('[type="email"]').click().type('admin@gmail.com') 
        cy.get('[type="password"]').click().type('123456789') 
        cy.get('button').click()
    });
    
    it('Fazer login e logout', () => {
        cy.visit('http://localhost:5173/')
        cy.get('[type="email"]').click().type('admin@gmail.com') 
        cy.get('[type="password"]').click().type('admin1') 
        cy.get('button').click()
        cy.get('.box-button-sair > button').click()
    });
    
    it('Fazer login com o usuário e senha correta', () => {
        cy.visit('http://localhost:5173/')
        cy.get('[type="email"]').click().type('admin@gmail.com') 
        cy.get('[type="password"]').click().type('admin1') 
        cy.get('button').click()
    });


})

