module.exports = function(app){

  var express = require('express');
  var router = express.Router();
  var mysql = require('mysql');
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

  router.post('/write', function(req, res){
    var title = req.body.title;
    var number = req.body.number;
    var kind = req.body.kind;1
    var area = req.body.area;

    //db 저장

    res.redirect("/services.html");
  })

  router.get('/init', function(req, res){
    //db 연결 작업
    res.redirect('/mypage.html');
  })


  return router;
};
