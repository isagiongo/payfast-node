const { check, validationResult } = require('express-validator');

module.exports = function(app){
    app.get('/pagamentos', function(req, res){
      console.log('Recebida requisicao de teste na porta 3000.')
      res.send('OK.');
    });
  
    app.post('/pagamentos/pagamento', [
        check('forma_de_pagamento').not().isEmpty
    ], (req, res) => {        
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            console.log('Erro de validação');
            return res.status(422).json({ errors: errors.array() });
          }
  
      var pagamento = req.body;
      console.log('processando uma requisicao de um novo pagamento');
  
      pagamento.status = 'CRIADO';
      pagamento.data = new Date;
  
      var connection = app.persistencia.connectionFactory();
      var pagamentoDao = new app.persistencia.PagamentoDao(connection);
  
      pagamentoDao.salva(pagamento, function(erro, resultado){
        if(erro){
          console.log('Erro ao inserir no banco:' + erro);
          res.status(500).send(erro);
        } else {
        console.log('pagamento criado');
        res.location('/pagamentos/pagamento/' +
              resultado.insertId);
  
        res.status(201).json(pagamento);
      }
      });
  
    });
}