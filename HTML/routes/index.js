module.exports = function (app) {
  var express = require('express');
  var nodemailer = require('nodemailer');
  var router = express.Router();
  var mysql = require('mysql');

    var connection = mysql.createConnection({
        host: "192.168.240.1", //서버 로컬 IP
        port: 3303,
        user: "root", //계정 아이디
        password: "1234", //계정 비밀번호
        database: "Block" //접속할 DB
    })

  return router;
};
