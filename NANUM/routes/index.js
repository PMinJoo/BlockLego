module.exports = function (app) {
  var express = require('express');
  var router = express.Router();
  var mysql = require('mysql');
  var JSAlert = require("js-alert");
  var url = require('url');

  var client = mysql.createConnection({
      host: "localhost", //서버 로컬 IP
      port: 3306,
      user: "root", //계정 아이디
      password: "1234", //계정 비밀번호
      database: "Block" //접속할 DB
  })

  router.get('/', function(req, res){
    res.status(200);
    res.render('index', {
      login: req.session.login,
      userid: req.session.userID,
    });
  })

//login
  router.post('/login', function(req, res){
    var id = req.body.inputId;
    var pw = req.body.inputPassword;
    var queryString = 'select * from Web where dongguk_webmail=?'
    client.query(queryString, [id], function (error2, data) {
      if (error2) {
        console.log(error2);
        res.redirect('/');
      } else if (!data[0]) {
        res.send('<script type="text/javascript">alert("아이디 혹은 비밀번호를 확인해주세요.");</script>');
      } else {
        var user = data[0];
				req.session.userID = id;
				req.session.login = 'login';
        res.redirect("index-2.html");
				console.log(req.session.login);
      }
    });
  })

  //Logout
  router.get('/logout', function(req, res){
    req.session.login = 'logout';
    res.status(200);
    res.redirect('/index.html');
  })

  return router;
};
