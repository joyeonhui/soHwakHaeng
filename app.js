var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.listen(3456, function(){
  console.log("start!!!! express server on port 3456");
  console.log(__dirname);
});
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
//url rounting
app.get('/', function(req,res){
  res.sendFile(__dirname+'/public/main.html');
});

var connection = mysql.createConnection({
    host     : 'loaclhost',
    port     : '3306',
    user     : 'root',
    password : '1234',
    database : 'sohwaghang'
    //socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock'
});

connection.connect();
console.log("ssdfsdf");
connection.query('SELECT * FROM userData;',function(err, rows,fileds){
  console.log("here");
  if(err) {                                   // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err.stack);
            console.log(err);
            //setTimeout(handleDisconnect, 2000);     // We introduce a delay before attempting to reconnect,
  }else{
            console.log('Connected to db!');
  }
});


app.post('/signUp',function(req,res){
  console.log(req.body.Name);
  res.sendFile(__dirname+"/public/login.html");
  if(req.body.PW != req.body.PW_Check){
    res.se1nd('<script type="text/javascript">alert("비밀번호가 맞지 않습니다.");</script>');
  }

  var name = req.body.Name;
  var id = req.body.ID;
  var pw = req.body.PW;
  var tel = req.body.Tel;
  var email = req.body.mail;
  var insertQuery = "INSERT INTO userData(userId, pass, name, tell, email) VALUES ('"+id+"','"+pw+"','" +name+"','"+tel+"','"+email+"');";
    connection.query(insertQuery,function(err,result){
      if (err) {
      console.trace('fatal error: ' + err.message);
      }
    });

});


app.post('/login',function(req, res){
  console.log("asdf");

  console.log(req.body);
  //req.body.id
  var idCheckQuery = "SELECT 1;";
  connection.query(idCheckQuery,function(err,result){
	  console.log(err)
    console.log("result :"+result.userId)
    if(result.userId != req.body.id){
      res.send('<script type="text/javascript">alert("아이디가 존재하지 않습니다.");</script>');
    }

    if(result.userId == req.body.id){
      if(result.pass == req.body.pw){
        res.send('<script type="text/javascript">alert("환영합니다");</script>');
        res.sendFile(__dirname+"/public/main.html");
      }
    }
  });
});
