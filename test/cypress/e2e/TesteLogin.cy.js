/// <reference types="cypress" />

describe('Cypress Basic', () => {
    
    it('Deve encontrar e interagir com o elemento', () => {
        cy.visit('http://localhost:5173/')
        cy.get('[type="email"]').click().type('admin@gmail.com') 
        cy.get('[type="password"]').click().type('admin1') 
        cy.get('button').click()
    });
})