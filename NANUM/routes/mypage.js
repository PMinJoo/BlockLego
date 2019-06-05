module.exports = function(app){

  var express = require('express');
  var router = express.Router();
  var mysql = require('mysql');
  var usl = require('url');

  router.post('/', function(req, res){
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
