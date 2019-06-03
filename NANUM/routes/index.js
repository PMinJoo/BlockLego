module.exports = function (app) {
  var express = require('express');
  var router = express.Router();
  var mysql = require('mysql');
  var JSAlert = require("js-alert");
  var url = require('url');

  var connection = mysql.createConnection({
    host: "",
    port: ,
    user: "",
    password: "",
    datatbase: ""
  })

  router.get('/', function(req, res){
    res.status(200);
    res.render('index', {
      url: req.url,
      login: req.session.login,
      userid: req.session.userID,
      username: req.session.username,
      authority: req.session.authority
    });
  })

  router.post('/login', function(req, res){
    var id = req.body.inputId;
    var pw = req.body.inputPassword;
    res.status(200);
    var queryString = 'select * from user where userid=? and userpw=?'
    connection.query(queryString, [id, pw], function(error2, data){
      if(error2){
        console.log(error2);
        res.redirect('/');
      } else if(!data[0]){
        res.send({msg:"아이디 또는 비밀번호를 확인해주세요!"});
      } else{
        var user = data[0];
        req.session.userID = id;
        req.session.username = user.username;
        req.session.authority = user.auth;
        req.session.login = 'login';
        res.redirect("/index-2.html");
        console.log(req.session.login);
      }
    });
  })

  //Logout
  router.get('/logout', function(req, res){
    req.session.login = 'logout';
    res.status(200);
    res.redirect('/');
  })

  return router;
};
