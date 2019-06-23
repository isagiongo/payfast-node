class PagamentoDao {
    constructor(connection) {
        console.log('conexao');
        this._connection = connection;
    }
    salva(pagamento, callback) {
        console.log('chama salvar');
        this._connection.query('INSERT INTO pagamentos SET ?', pagamento, callback);
    }
    lista(callback) {
        this._connection.query('select * from pagamentos', callback);
    }
    buscaPorId(callback) {
        this._connection.query('select * from pagamentos where id = ?', [id], callback);
    }
}




module.exports = function (connection) {
    return PagamentoDao;
}