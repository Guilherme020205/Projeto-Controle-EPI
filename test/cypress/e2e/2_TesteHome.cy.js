/// <reference types="cypress" />

describe('Home', () => {
    it('Button epis', () => {
        cy.visit('http://localhost:5173/home')
        cy.get('.box-icon > :nth-child(2)')
        .click({ timeout: 10000 })
    })
    it('Button funcionario', () => {
        cy.visit('http://localhost:5173/home')
        cy.get('.box-icon > :nth-child(3)')
        .click({ timeout: 10000 })
    })
    it('Button lista', () => {
        cy.visit('http://localhost:5173/home')
        cy.get('.box-icon > :nth-child(4)')
        .click({ timeout: 10000 })
    })
    it('Button home', () => {
        cy.visit('http://localhost:5173/home')
        cy.get('.box-icon > :nth-child(1)')
        .click({ timeout: 10000 })
    })
})