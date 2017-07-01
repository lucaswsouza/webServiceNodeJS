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
const urlRelatorio  = "relatorio";

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

// libera o CORS
app.all('/*', function(req, res, next) {
	res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","POST, GET, OPTIONS, DELETE, PUT, HEAD");
	next();
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

app.get('/' + urlRelatorio , function(req , res){
    var sql = "SELECT dm104.vendas.idFilme , count(*) FROM dm104.vendas group by dm104.vendas.idFilme LIMIT 5;"; 
    resultado = connection.con.query(sql, function (err, rows, fields) {        
        if (err) throw "Falha no relatorio == > " + err;     
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
    var sql = " INSERT INTO dm104.vendas (idCliente , dataVenda , total , idFilme) " + 
              " values ( ? , ? , ? ,? )                                            " ; 
    resultado = connection.con.query(sql , [req.body.idCliente , req.body.dataVenda , req.body.total , req.body.idFilme] , 
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


// --- funcoes do PUT --- //
//    deve ser enviado [{"key":"Content-Type","value":"application/json","description":""}]
app.put('/'+urlVendas , function(req, res){
    var sql = " UPDATE dm104.vendas                                          " +
               " SET idCliente = ? , dataVenda = ? , total = ? , idFilme = ? " + 
               " where idVendas = ?                                          " ; 
    resultado = connection.con.query(sql , [req.body.idCliente , req.body.dataVenda , 
                                            req.body.total , req.body.idVendas , req.body.idFilme ] , 
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


// --- funcoes do DELETE --- //
app.delete('/'+urlVendas+'/:id' , function(req, res){
    var sql = " DELETE FROM dm104.vendas        " +
              " where dm104.vendas.idVendas = ? " ; 

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