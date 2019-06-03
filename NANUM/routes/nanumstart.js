module.exports = function(app){

  var express = require('express');
  var router = express.Router();
  var mysql = require('mysql');
  var usl = require('url');

  router.post('/', function(req, res){
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
