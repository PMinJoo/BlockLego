module.exports = function(app){

  var express = require('express');
  var router = express.Router();
  var mysql = require('mysql');
  var usl = require('url');
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

  router.post('/check', function(req, res){
    //수령 버튼(check) 누르면 실행되는 곳
  })


  router.get('/initMynanum', function(req, res){
    //작업
    res.redirect('/mypage.html');
  })

  router.get('/initMyorder', function(req, res){
    //작업
    res.redirect('/myorder.html');
  })

  router.get('/initMonitoring', function(req, res){
    //작업
    res.redirect('/monitoring.html');
  })


  return router;

};
