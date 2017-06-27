// framework express
var express = require('express');
// modulo body-parser, middleware para analisar o JSON
var bodyParser = require('body-parser');
// conexao ao mysql
var mysql = require('mysql');
// controle da conexao
var connection = require ('./CONTROLLER/connection.js');

// constantes de endereços URL
const urlClientes   = "cliente"; 
const urlVendas     = "venda";
const urlFilmes     = "filme";
const urlItensVenda = "itensVenda"

// cria o express e usa o parser como json
var app = express();
app.use(bodyParser.json());

// controle do 404
function notFound(res){
    res.status(404).send('Página não existe!');
}

// escuta a porta 8089 
app.listen(8089 ,function(){
    console.log('Trabalho final DM104 - INATEL [INICIADO]');
});

// acessando o / retorna um status , poderia ser o WSDL
app.get('/',function(req , res){
    res.status(200).send('Trabalho final DM104 - INATEL');
});


// --- funcoes do / --- //
app.get('/' + urlClientes , function(req , res){
    var sql = "select * from dm104.cliente"; 
    resultado = connection.con.query(sql, function (err, rows, fields) {        
        if (err) throw "Falha na consulta de clientes == > " + err;     
        res.status(200).send( rows ) ;
    });    
});

app.get('/' + urlVendas ,function(req , res){    
    var sql = "select * from dm104.vendas"; 
    resultado = connection.con.query(sql, function (err, rows, fields) {        
        if (err) throw "Falha na consulta de vendas == > " + err;     
        res.status(200).send( rows ) ;
    });  
});

app.get('/' + urlFilmes ,function(req , res){
    var sql = "select * from dm104.filmes"; 
    resultado = connection.con.query(sql, function (err, rows, fields) {        
        if (err) throw "Falha na consulta de filmes == > " + err;      
        res.status(200).send( rows ) ;
    });  
});

app.get('/' + urlItensVenda ,function(req , res){
    var sql = "select * from dm104.itensvenda"; 
    resultado = connection.con.query(sql, function (err, rows, fields) {        
        if (err) throw "Falha na consulta dos itens da venda == > " + err;      
        res.status(200).send( rows ) ;
    });  
});



// --- funcoes do GET por id --- //
app.get('/'+urlVendas+'/:id' , function(req, res){
    var sql = "SELECT * FROM dm104.vendas where dm104.vendas.idVendas = ?"; 
    resultado = connection.con.query(sql , [req.params.id] , function (err, rows, fields) {        
        if (err) throw "Falha na consulta das vendas == > " + err;      
        res.status(200).send( rows ) ;
    });
});

app.get('/'+urlFilmes+'/:id' , function(req, res){
    var sql = "SELECT * FROM dm104.filmes where dm104.filmes.idFilmes = ?"; 
    resultado = connection.con.query(sql , [req.params.id] , function (err, rows, fields) {        
        if (err) throw "Falha na consulta dos filmes == > " + err;      
        res.status(200).send( rows ) ;
    });
});

app.get('/'+urlClientes+'/:id' , function(req, res){
    var sql = "SELECT * FROM dm104.cliente where dm104.cliente.idCliente = ?"; 
    resultado = connection.con.query(sql , [req.params.id] , function (err, rows, fields) {        
        if (err) throw "Falha na consulta dos clientes == > " + err;      
        res.status(200).send( rows ) ;
    });
});

app.get('/'+urlItensVenda+'/:id' , function(req, res){
    var sql = "SELECT * FROM dm104.itensvenda where dm104.itensvenda.idvendas = ?"; 
    resultado = connection.con.query(sql , [req.params.id] , function (err, rows, fields) {        
        if (err) throw "Falha na consulta dos itens da venda == > " + err;      
        res.status(200).send( rows ) ;
    });  
});


// --- funcoes do POST --- // 
//    deve ser enviado [{"key":"Content-Type","value":"application/json","description":""}]
app.post('/' + urlFilmes , function(req, res){    
    var sql = " INSERT INTO dm104.filmes (titulo , prvenda , estoque) " + 
              " values ( ? , ? , ?  )                                 " ; 
    resultado = connection.con.query(sql , [req.body.titulo , req.body.prvenda , req.body.estoque ] , 
    function (err, resulst) {        
        if (err) throw "Falha na insercao do filme == > " + err;      
        res.status(200).send( "OK" ) ;
    }); 
});

app.post('/' + urlVendas , function(req, res){    
    var sql = " INSERT INTO dm104.vendas (idCliente , dataVenda , total) " + 
              " values ( ? , ? , ?  )                                    " ; 
    resultado = connection.con.query(sql , [req.body.idCliente , req.body.dataVenda , req.body.total ] , 
    function (err, resulst) {        
        if (err) throw "Falha na insercao da venda == > " + err;      
        res.status(200).send( "OK") ;
    }); 
});

app.post('/' + urlClientes , function(req, res){    
     var sql = " INSERT INTO dm104.cliente (Nome) " + 
              " values ( ? )                      " ; 
    resultado = connection.con.query(sql , [req.body.nome ] , 
    function (err, resulst) {        
        if (err) throw "Falha na insercao do cliente == > " + err;      
        res.status(200).send( "OK") ;
    }); 
});

app.post('/' + urlItensVenda , function(req, res){    
    var sql = " INSERT INTO dm104.itensvenda (idFilmes , idVendas , quantidade , preco) " + 
              " values ( ? , ? , ? , ? )                                                " ; 
    resultado = connection.con.query(sql , [req.body.idFilmes , req.body.idVendas , 
                                            req.body.quantidade , req.body.preco ] , 
    function (err, resulst) {        
        if (err) throw "Falha na insercao do item da venda == > " + err;      
        res.status(200).send( "OK") ;
    }); 
});



// --- funcoes do PUT --- //
//    deve ser enviado [{"key":"Content-Type","value":"application/json","description":""}]
app.put('/'+urlVendas , function(req, res){
    var sql = " UPDATE dm104.vendas                            " +
               " SET idCliente = ? , dataVenda = ? , total = ? " + 
               " where idVendas = ?                            " ; 
    resultado = connection.con.query(sql , [req.body.idCliente , req.body.dataVenda , 
                                            req.body.total , req.body.idVendas ] , 
    function (err, resulst) {        
        if (err) throw "Falha na atualizacao da venda == > " + err;      
        res.status(200).send( "OK") ;
    });
});

app.put('/'+urlClientes , function(req, res){
    var sql = " UPDATE dm104.cliente  " +
               " SET nome = ?         " + 
               " where idCliente = ?  " ; 
    resultado = connection.con.query(sql , [req.body.nome , req.body.idCliente ] , 
    function (err, resulst) {        
        if (err) throw "Falha na atualizacao do cliente == > " + err;      
        res.status(200).send( "OK") ;
    });
});

app.put('/'+urlFilmes , function(req, res){
    var sql = " UPDATE dm104.filmes                         " +
               " SET titulo = ? , prvenda = ? , estoque = ? " + 
               " where idFilmes = ?                         " ; 
    resultado = connection.con.query(sql , [req.body.titulo , req.body.prvenda , 
                      req.body.estoque , req.body.idFilmes ] , 
    function (err, resulst) {        
        if (err) throw "Falha na atualizacao do filme == > " + err;      
        res.status(200).send( "OK") ;
    });
});

app.put('/'+urlItensVenda , function(req, res){
    var sql = " UPDATE dm104.itensvenda                                      " +
              " SET idFilmes = ? , idVendas = ? , quantidade = ? , preco = ? " + 
              " where idItensVenda = ?                                       " ; 
    resultado = connection.con.query(sql , [req.body.idFilmes , req.body.idVendas , 
                      req.body.quantidade , req.body.preco , req.body.idItensVenda ] , 
    function (err, resulst) {        
        if (err) throw "Falha na atualizacao dos itens da venda == > " + err;      
        res.status(200).send( "OK") ;
    }); 
});


// --- funcoes do DELETE --- //
app.delete('/'+urlVendas+'/:id' , function(req, res){
    var sql = " DELETE FROM dm104.vendas , dm104.itensvenda           " +
              " where dm104.vendas.idVendas = ? and                   " + 
              "       dm104.itensvenda.idVendas = dm104.venda.idVenda " ; 

    resultado = connection.con.query(sql , [req.params.id] , function (err, resulst) {        
        if (err) throw "Falha na exclusao da venda == > " + err;      
        res.status(200).send( "OK" ) ;
    });
});

app.delete('/'+urlFilmes+'/:id' , function(req, res){
    var sql = "DELETE FROM dm104.filmes where dm104.filmes.idFilmes = ?"; 
    resultado = connection.con.query(sql , [req.params.id] , function (err, resulst) {        
        if (err) throw "Falha na exclusao do filme == > " + err;      
        res.status(200).send( "OK" ) ;
    }); 
});

app.delete('/'+urlClientes+'/:id' , function(req, res){
    var sql = "DELETE FROM dm104.cliente where dm104.cliente.idCliente = ?"; 
    resultado = connection.con.query(sql , [req.params.id] , function (err, resulst) {        
        if (err) throw "Falha na exclusao de cliente == > " + err;      
        res.status(200).send( "OK") ;
    }); 
});

app.delete('/'+urlItensVenda+'/:id' , function(req, res){
    var sql = "DELETE FROM dm104.itensvenda where dm104.itensvenda.idItensVenda = ?"; 
    resultado = connection.con.query(sql , [req.params.id] , function (err, resulst) {        
        if (err) throw "Falha na exclusao dos itens da venda == > " + err;      
        res.status(200).send( "OK" ) ;
    });  
});