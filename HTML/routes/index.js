module.exports = function (app) {
  var express = require('express');
  var nodemailer = require('nodemailer');
  var router = express.Router();
  var mysql = require('mysql');

    var client = mysql.createConnection({
        host: "localhost", //서버 로컬 IP
        user: "root", //계정 아이디
        password: "1234", //계정 비밀번호
        database: "Block" //접속할 DB
    })

  return router;
};
