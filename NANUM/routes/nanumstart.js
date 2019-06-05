module.exports = function(app){

  var express = require('express');
  var router = express.Router();
  var mysql = require('mysql');
  var url = require('url');
  var dateFormat = require('dateformat');
  let randomNumber = 00000000;

  var connection = mysql.createConnection({
      host: "localhost", //서버 로컬 IP
      user: "root", //계정 아이디
      password: "1234", //계정 비밀번호
      database: "Block" //접속할 DB
  })

  router.get('/', function(req, res){
    res.status(200);
    res.render('nanumstart', {
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
        else{
            res.send('<script type="text/javascript">alert("나눔이 정상적으로 등록되었습니다.");</script>');
        }
    });

    res.redirect("/services");
  })

  router.get('/init', function(req, res){
    //db 연결 작업
    res.redirect('/mypage.html');
  })


  return router;
};
