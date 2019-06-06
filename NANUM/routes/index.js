module.exports = function (app) {
  var express = require('express');
  var router = express.Router();
  var mysql = require('mysql');
  var JSAlert = require("js-alert");
  var url = require('url');
  var dateFormat = require('dateformat');

  var connection = mysql.createConnection({
      host: "localhost", //서버 로컬 IP
      user: "root", //계정 아이디
      password: "1234", //계정 비밀번호
      database: "Block" //접속할 DB
  })

  router.get('/', function(req, res){
    res.status(200);
    res.render('index', {
			url: req.url,
      login: req.session.login,
      userid: req.session.userID,
    });
  })

  router.get('/login', function(req, res){
    res.status(200);
    res.render('login', {
      url: req.url,
      login: req.session.login,
      userid: req.session.userID,
    });
  })

//login
  router.post('/login', function(req, res){
    var id = req.body.inputId;
    var pw = req.body.inputPassword;
    var day=dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");
		res.status(200);
    var queryString = 'select * from Web where dongguk_webmail=?'
    connection.query(queryString, [id], function (error2, data) {
      if (error2) {
        console.log(error2);
        res.redirect('/');
      } else if (!data[0]) {
        res.send('<script type="text/javascript">alert("아이디 혹은 비밀번호를 확인해주세요.");</script>');
          var queryString = 'insert into Monitor (login_id, login_date, login_pf) values (?, ?, ?)'
          var params = [id, day, 0];
          connection.query(queryString, params, function (err, rows) {
              if (err) {
                  console.log(err);
              }
          });
      } else {
        var queryString = 'insert into Monitor (login_id, login_date, login_pf) values (?, ?, ?)'
        var params = [id, day, 1];
        connection.query(queryString, params, function (err, rows) {
            if (err) {
                console.log(err);
            }
        });
        var user = data[0];
				req.session.userID = id;
				req.session.login = 'login';
        res.redirect("/index2");
				console.log(req.session.login);
      }
    });
  })

    router.get('/index2', function(req, res){
      res.status(200);
      res.render('index-2', {
  			url: req.url,
        login: req.session.login,
        userid: req.session.userID,
      });
    })

  //Logout
  router.get('/logout', function(req, res){
    req.session.login = 'logout';
    res.status(200);
    res.redirect('/');
    console.log(req.session.login);
  })

  return router;
};
