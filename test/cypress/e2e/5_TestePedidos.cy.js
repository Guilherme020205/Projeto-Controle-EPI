/// <reference types="cypress" />


describe('Pedidos', () => {

    it('Cadastrar Pedido', () => {
        cy.visit('http://localhost:5173/home/pedidos')
        cy.get('.box-botao-lista > button').click()
        cy.get('.box-info-funcionario > select').select('Mario Bros')

        cy.get('.box-div-filho1 > :nth-child(1) > select').select('Óculos de Segurança Incolor Spectra 2000 Carbografite  4.5  (82)')

        cy.get('.box-div-filho1 > :nth-child(1) > input')
            .click()
            .type('5') // coloco 5 para testar o campo que deve apenas aceita no maximo 1 

        cy.get('.box-div-filho1 > :nth-child(2) > select').select('Máscara Respiratória Aura 9322+BR 3M')
        cy.get('.box-div-filho1 > :nth-child(2) > input')
            .click()
            .type('1')

        cy.get('.box-div-filho1 > :nth-child(4) > select').select('Bota de Segurança com CA Imbiseg Couro Preto 43 SB')
        cy.get('.box-div-filho1 > :nth-child(4) > input')
            .click()
            .type('1')
        cy.get('.botao-cadastro-pedido').click()
    });

    it("Valida descrição", () => {
        cy.visit('http://localhost:5173/home/pedidos')
        cy.get('.modalll > button > svg > path', { timeout: 50000 }).click()
        cy.get(':nth-child(1) > p')
            .get(':nth-child(2) > p')
            .get(':nth-child(3) > p')
    })

    it("Valida entrega", () => {
        cy.visit('http://localhost:5173/home/pedidos')
        cy.get('.box-2-pedido > :nth-child(1) > svg > path', { timeout: 50000 }).click()
    })

})
