module.exports = function(app) {
    app.get('/pagamentos', function(req, res) {
        console.log('recebida requisicao de teste na porta 3000');
        res.send('OK');
    });

    app.post('/pagamentos/pagamento', function(req, res) {

        var pagamento = req.body;
        console.log(pagamento);
        pagamento.status = 'Criado';
        pagamento.data = new Date;

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.salva(pagamento, function(erro, resultado) {
            if (erro) {
                console.log('Erro ao inserir no banco ' + erro);
                res.status(400).send(erro);
            } else {
                console.log('Pagamento criado');
                res.json(pagamento);
            }
        });
    });
}



