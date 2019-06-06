module.exports = function(app){

  var express = require('express');
  var router = express.Router();
  var mysql = require('mysql');
  var usl = require('url');
  var dateFormat = require('dateformat');

  var connection = mysql.createConnection({
      host: "localhost", //서버 로컬 IP
      user: "root", //계정 아이디
      password: "1234", //계정 비밀번호
      database: "Block" //접속할 DB
  })

  router.get('/', function(req, res){
    res.status(200);
    res.render('mypage', {
      url: req.url,
      login: req.session.login,
      userid: req.session.userID,
    });
  })

  router.post('/check/:id', function(req, res){
    //수령 버튼(check) 누르면 실행되는 곳
    res.status(200);
    connection.query('UPDATE NanumList SET is_received = 1 WHERE nanum_id=? and student_id=?', [req.params.id], req.session.userID], function(error){
      if (error){
        console.log("error:"+error);
        res.redirect('/');
      } else{
        res.redirect('/mypage/initMynanum');
      }
    })
  })

  router.get('/initMynanum', function(req, res){
    var queryString = 'select * from NanumList where nanumer_id=? order by is_received, nanum_date'
    connection.query(queryString, [req.session.userID], function (error2, data) {
        if (error2) {
            console.log("???"+error2);
            res.redirect('/');
        }
        else{
            res.render('mypage', {
              url: req.url,
              login: req.session.login,
              userid: req.session.userID,
              data: data,
            });
        }
    })
  })

  router.get('/initMyorder', function(req, res){
    var queryString = 'select * from NanumList where student_id=? order by is_received, nanum_date'
    connection.query(queryString, [req.session.userID], function (error2, data) {
        if (error2) {
            console.log("???"+error2);
            res.redirect('/');
        }
        else{
            res.render('myorder', {
              url: req.url,
              login: req.session.login,
              userid: req.session.userID,
              data: data,
            });
        }
    })
  })

  router.get('/initMonitoring', function(req, res){
    var queryString = 'select * from Monitor where login_id=? order by login_date'
    connection.query(queryString, [req.session.userID], function (error2, data) {
        if (error2) {
            console.log("???"+error2);
            res.redirect('/');
        }
        else{
            res.render('monitoring', {
              url: req.url,
              login: req.session.login,
              userid: req.session.userID,
              data: data,
            });
        }
    })
  })


  return router;

};
