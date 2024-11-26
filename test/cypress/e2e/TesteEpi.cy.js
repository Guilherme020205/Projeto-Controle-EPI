/// <reference types="cypress" />


describe('Epi Principal', () => {
    it('Clicar no botão de cadastrar EPI', () => {
        cy.visit('http://localhost:5173/home/epis')
        cy.get('.box-botao-epis > button').click()
    });

    it('Cadastrar EPI', () => {
        cy.visit('http://localhost:5173/home/epis/cadastro')
        cy.get(':nth-child(1) > input').click().type('Teste')
        cy.get('select').select('Capacete')
        cy.get(':nth-child(3) > input').click().clear().type('2')
        cy.get('.botao-cadastro-epi').click()
    });

    it('Editar EPI', () => {
        cy.visit('http://localhost:5173/home/epis')
        cy.get(':nth-child(11) > .box-opcoes-epi > button > a > svg', { timeout: 10000 }) // Timeout ajustado para 10s
            .should('exist') // Aguarda o elemento existir no DOM
            .click();
        cy.get('.input-nome')
            .click()
            .clear()
        cy.get('.input-nome')
            .click()
            .should('have.value', 'Teste') //validação de dados existentes
            .clear()
            .type('teste mudando')
        cy.get('.select-tipos')
            .should('have.value', '1016624261619580929')
            .select('Oculos')
        cy.get(':nth-child(3) > .input-quantidade')
            .click()
            .should('have.value', '2')
            .clear()
            .type('5')
        cy.get(':nth-child(4) > .input-quantidade')
            .click()
            .should('have.value', '0')
            .clear()
            .type('1')
        cy.get('.botao-editar-epi').click()
    });
    it('Excluir  EPI', () => {
        cy.visit('http://localhost:5173/home/epis')
        // cy.get(':nth-child(11) > .box-opcoes-epi > button > a > svg', { timeout: 10000 }) // Timeout ajustado para 10s
        //     .should('exist') // Aguarda o elemento existir no DOM
        //     .click()
        //     .should('have.value')
        // cy.get('.botao-excluir-epi').click()
    });
})
