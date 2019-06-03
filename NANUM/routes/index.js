module.exports = function (app) {
  var express = require('express');
  var router = express.Router();
  var mysql = require('mysql');
  var JSAlert = require("js-alert");
  var url = require('url');


  router.get('/', function(req, res){
    // res.status(200);
    // res.render('index', {
    //   url: req.url,
    //   login: req.session.login,
    //   userid: req.session.userID,
    //   username: req.session.username,
    //   authority: req.session.authority
    // });
  })

//login
  router.post('/login', function(req, res){
    var id = req.body.inputId;
    var pw = req.body.inputPassword;

  })

  //Logout
  router.get('/logout', function(req, res){
    // req.session.login = 'logout';
    // res.status(200);
    // res.redirect('/');
  })

  return router;
};
