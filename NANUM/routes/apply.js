module.exports = function(app){

  var express = require('express');
  var router = express.Router();
  var mysql = require('mysql');
  var usl = require('url');
  var dateFormat = require('dateformat');
  let randomNumber = 00000000;

  var connection = mysql.createConnection({
      host: "localhost", //서버 로컬 IP
      user: "root", //계정 아이디
      password: "1234", //계정 비밀번호
      database: "Block" //접속할 DB
  })

  // router.get('/:id', function (req, res) {
  //     res.status(200);
  //
  //     console.log("!!"+req.params.id);
  //
  //     res.render('services', {
  //         url: req.url,
  //         login: req.session.login,
  //         username: req.session.username,
  //         data: data,
  //     });
  // })

    router.get('/write', function(req, res){
      res.status(200);
      res.render('write', {
  			url: req.url,
        login: req.session.login,
        userid: req.session.userID,
      });
    })

    router.post('/write', function(req, res){
      var title = req.body.title;
      var number = req.body.number;
      var kind = req.body.kind;
      var nanumday = req.body.nanumday;
      var area = req.body.area;
      var day=dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");
      randomNumber = Math.floor(Math.random() * (999999-111111))+111111;
      var queryString = 'insert into Nanum (nanum_id, title, writer, wirte_date, kind, quantity, place, nanum_date) values (?, ?, ?, ?, ?, ?, ?, ?)'
      var params = [randomNumber, title, req.session.userID, day, kind, number, area, nanumday];
      connection.query(queryString, params, function (err, rows) {
          if (err) {
              console.log(err);
          }
      });
      res.redirect("/apply/init");
    })

  router.post('/regist', function(req, res){
    randomNumber = Math.floor(Math.random() * (99999999-11111111))+11111111;
    res.send('<script type="text/javascript">alert("신청이 완료되었습니다. 신청 번호: '+randomNumber+'");document.location.href="/services.html";</script>');
    //de 저장
  })

  router.get('/init', function(req, res){
    var queryString = 'select * from Nanum'
    connection.query(queryString, function (error2, data) {
        if (error2) {
            console.log("???"+error2);
            res.redirect('/');
        } else {
          res.render('services', {
              url: req.url,
              login: req.session.login,
              username: req.session.username,
              data: data,
          });
        }

    })
  })

  return router;

};
