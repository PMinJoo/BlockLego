module.exports = function(app){

  var express = require('express');
  var router = express.Router();
  var mysql = require('mysql');
  var usl = require('url');
  var dateFormat = require('dateformat');
  let randomNumber = 00000000;

  var connection = mysql.createConnection({
      host: "localhost", //서버 로컬 IP
      user: "root", //계정 아이디
      password: "1234", //계정 비밀번호
      database: "Block" //접속할 DB
  })

  router.get('/', function (req, res) {
      res.status(200);
  })

  router.post('/regist', function(req, res){
    randomNumber = Math.floor(Math.random() * (99999999-11111111))+11111111;
    res.send('<script type="text/javascript">alert("신청이 완료되었습니다. 신청 번호: '+randomNumber+'");document.location.href="/services.html";</script>');
    //de 저장
  })

  router.get('/init', function(req, res){
    var queryString = 'select * from Nanum'
    connection.query(queryString, function (error2, data) {
        if (error2) {
            console.log(error2);
            res.redirect('/');
        } else {
          res.render('services', {
              url: req.url,
              login: req.session.login,
              username: req.session.username,
              data: data,
          });
        }

    })
    res.redirect('/services.ejs');
  })

  return router;

};
