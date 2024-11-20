const Pedido = require('../models/TabelaPedidos');
const Funcionario = require('../models/TabelaFuncionario');
const Epi = require('../models/TabelaEpis');

exports.listaPedidos = async (req, res) => {
    try {
        // Filtrando para pegar apenas os pedidos com 'devolvido: false'
        const pedidos = await Pedido.findAll({
            where: {
                devolvido: false // Apenas pedidos que não foram devolvidos
            },
            include: [
                {
                    model: Funcionario,
                    as: 'funcionario',
                    attributes: ['id', 'nome']  // Nome do funcionário
                }
            ]
        });

        // Formatar resposta
        const pedidosFormatados = pedidos.map(pedido => {
            const funcionario = pedido.funcionario.nome;
            const dataPedido = pedido.createdAt;  // Data e hora do pedido
            const itens = [
                { nome: 'Óculos', quantidade: pedido.quantidadeOculos },
                { nome: 'Máscara', quantidade: pedido.quantidadeMascara },
                { nome: 'Luva', quantidade: pedido.quantidadeLuva },
                { nome: 'Bota', quantidade: pedido.quantidadeBota },
                { nome: 'Capacete', quantidade: pedido.quantidadeCapacete },
                { nome: 'Fone', quantidade: pedido.quantidadeFone },
                { nome: 'Colete', quantidade: pedido.quantidadeColete }
            ].filter(item => item.quantidade > 0); // Apenas itens com quantidade

            return {
                funcionario,
                dataPedido,
                itens
            };
        });

        res.status(200).json(pedidosFormatados);
    } catch (error) {
        res.status(500).send({ mensagem: 'Erro ao listar pedidos.', erro: error.message });
    }
};


exports.cadastrarPedidos = async (req, res) => {
    let {
        devolvido = false,
        idFuncionario,
        idOculos, quantidadeOculos,
        idMascara, quantidadeMascara,
        idLuva, quantidadeLuva,
        idBota, quantidadeBota,
        idCapacete, quantidadeCapacete,
        idFone, quantidadeFone,
        idColete, quantidadeColete
    } = req.body;

    try {
        const nenhumEpiInformado = !(
            idOculos || idMascara || idLuva || idBota ||
            idCapacete || idFone || idColete
        );

        if (nenhumEpiInformado) {
            return res.status(400).send({
                mensagem: 'Erro: pelo menos um EPI deve ser informado para cadastrar o pedido.'
            });
        }

        const novoPedido = await Pedido.create({
            devolvido,
            idFuncionario,
            idOculos, quantidadeOculos,
            idMascara, quantidadeMascara,
            idLuva, quantidadeLuva,
            idBota, quantidadeBota,
            idCapacete, quantidadeCapacete,
            idFone, quantidadeFone,
            idColete, quantidadeColete,
        });

        const atualizarEstoque = async (id, quantidade) => {
            if (id) {
                const epi = await Epi.findByPk(id);
                if (epi) {
                    // Garantir que quantidade_saida seja tratada como número
                    const novaQuantidadeSaida = Number(epi.quantidade_saida) + Number(quantidade);
                    await epi.update({
                        quantidade_estoque: epi.quantidade_estoque - quantidade,
                        quantidade_saida: novaQuantidadeSaida,
                    });
                }
            }
        };

        await Promise.all([
            atualizarEstoque(idOculos, quantidadeOculos),
            atualizarEstoque(idMascara, quantidadeMascara),
            atualizarEstoque(idLuva, quantidadeLuva),
            atualizarEstoque(idBota, quantidadeBota),
            atualizarEstoque(idCapacete, quantidadeCapacete),
            atualizarEstoque(idFone, quantidadeFone),
            atualizarEstoque(idColete, quantidadeColete),
        ]);

        res.status(201).send({
            mensagem: 'Pedido cadastrado com sucesso!',
            novoPedido
        });
    } catch (error) {
        res.status(500).send({
            mensagem: 'Erro ao cadastrar pedido.',
            erro: error.message
        });
    }
};



exports.devolverPedidos = async (req, res) => {
    const { id } = req.params;

    // Função para atualizar o estoque e a quantidade de saída
    const atualizarEstoque = async (id, quantidade) => {
        if (id) {
            const epi = await Epi.findByPk(id);
            if (epi) {
                // Garantir que quantidade_saida e quantidade_estoque sejam tratadas como números
                const novaQuantidadeEstoque = Number(epi.quantidade_estoque) + Number(quantidade);
                const novaQuantidadeSaida = Number(epi.quantidade_saida) - Number(quantidade); // Subtrai a quantidade

                // Atualiza o estoque e a quantidade de saída
                await epi.update({
                    quantidade_estoque: novaQuantidadeEstoque,
                    quantidade_saida: novaQuantidadeSaida,
                });
            }
        }
    };

    try {
        // Encontra o pedido pelo ID
        const pedido = await Pedido.findByPk(id);
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido não encontrado.' });
        }

        // Verifica se o pedido já foi devolvido
        if (pedido.devolvido) {
            return res.status(400).json({ error: 'O pedido já foi devolvido.' });
        }

        // Atualiza o pedido para 'devolvido'
        await pedido.update({ devolvido: true });

        // Atualiza o estoque de EPIs de volta (a quantidade sai do estoque e volta para o total)
        await Promise.all([
            atualizarEstoque(pedido.idOculos, pedido.quantidadeOculos),
            atualizarEstoque(pedido.idMascara, pedido.quantidadeMascara),
            atualizarEstoque(pedido.idLuva, pedido.quantidadeLuva),
            atualizarEstoque(pedido.idBota, pedido.quantidadeBota),
            atualizarEstoque(pedido.idCapacete, pedido.quantidadeCapacete),
            atualizarEstoque(pedido.idFone, pedido.quantidadeFone),
            atualizarEstoque(pedido.idColete, pedido.quantidadeColete),
        ]);

        res.status(200).json({ mensagem: 'Pedido devolvido e estoque atualizado.', pedido });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao devolver pedido.', detalhe: error.message });
    }
};

