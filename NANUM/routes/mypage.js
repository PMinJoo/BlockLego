module.exports = function(app){

  var express = require('express');
  var router = express.Router();
  var mysql = require('mysql');
  var usl = require('url');

  router.post('/', function(req, res){
    //수령 버튼(check) 누르면 실행되는 곳
  })


  router.get('/init', function(req, res){
    //작업
    res.redirect('/services.html');
  })

  return router;

};
