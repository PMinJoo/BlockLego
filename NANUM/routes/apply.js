module.exports = function(app){

  var express = require('express');
  var router = express.Router();
  var mysql = require('mysql');
  var usl = require('url');
  let randomNumber = 00000000;

  router.post('/', function(req, res){
    randomNumber = Math.floor(Math.random() * (99999999-11111111))+11111111;
    res.send('<script type="text/javascript">alert("신청이 완료되었습니다. 신청 번호: '+randomNumber+'");document.location.href="/services.html";</script>');
  })


  return router;

};
