// requer conexao ao mysql
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "dm104"
});

// deixa publico a conexao
exports.con = con;

// faz o teste da conexao
con.connect(function(err) {

  // se obteve erro ja finaliza
  if (err) throw "Falha ao conectar ao banco de dados ==> " + err;
  
  // se conectou correto
  console.log("Banco de dados conectado com sucesso!");
  
});
