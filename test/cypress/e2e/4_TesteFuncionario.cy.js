/// <reference types="cypress" />


describe('Funcionario Principal', () => {
    it('Clicar no botão de cadastrar Funcionario', () => {
        cy.visit('http://localhost:5173/home/funcionarios')
        cy.get('.box-botao-funcionarios > button').click()
    });

    it('Cadastrar Funcionario', () => {
        cy.visit('http://localhost:5173/home/funcionarios/cadastro')
        cy.get('.input-nome').click().type('Carlos Alberto')
        cy.get('.select-setores').select('Financeiro')
        cy.get('.input-telefone').click().type('(48) 9 8492-5796')
        cy.get('.botao-cadastro-funcionario').click()
    });

    it('Editar Funcionario', () => {
        cy.visit('http://localhost:5173/home/funcionarios')
        cy.get(':nth-child(3) > .box-botao-opcoes-funcionario > :nth-child(2) > a')
            .click()
        cy.get('.input-nome')
            .click()
            .clear()
        cy.get('.input-nome').click().should('have.value', 'Carlos Alberto') //validação de dados existentes
            .clear()
            .type('Carlos Alberto Modificado')
        cy.get('.select-setores')
            .should('have.value', '1016624679562117121')
            .select('Logística')
        cy.get('.input-telefone')
            .click()
            .should('have.value', '(48) 9 8492-5796')
            .clear()
            .type('(48) 9 8439-3084')
        cy.get('.botao-editar-funcionario')
            .click()
    });

    it('Excluir  EPI', () => {
        cy.visit('http://localhost:5173/home/funcionarios')
        cy.get(':nth-child(1) > .box-botao-opcoes-funcionario > :nth-child(2) > a')
            .click()
        cy.get('.input-nome')
            .click()
            .clear()
        cy.get('.input-nome')
            .should('have.value', 'Carlos Alberto Modificado')
            .clear()
        cy.get('.select-setores')
            .should('have.value', '1016624679561986049')
            .select('-- Selecionar')
        cy.get('.input-telefone')
            .should('have.value', '(48) 9 8439-3084')
            .clear()
        cy.get('.botao-excluir-funcionario')
            .click()
    });

    it('Abrir conversa no WhatsApp', () => {
        cy.visit('http://localhost:5173/home/funcionarios')
        cy.get(':nth-child(1) > .box-botao-opcoes-funcionario > :nth-child(1) > a')
            .click()
        cy.location('https://web.whatsapp.com/send?phone=+48%20991872908&text=Ola%20mundo')
    });
})
