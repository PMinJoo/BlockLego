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
              console.log("err:" + err);
          }
      });
      res.redirect("/apply/init");
    })

  router.get('/regist/:id', function(req, res){
    res.status(200);
    connection.query('select auth_number from NanumList where nanum_id=? and student_id=?', [req.params.id, req.session.userID], function (error2, data) {
        if (error2) {
            console.log("error:" + error2);
            res.redirect('/');
        }
        else if(!data[0]){
                connection.query('UPDATE Nanum SET quantity = quantity - 1 WHERE nanum_id=?', [req.params.id], function (error2) {
                    if (error2) {
                        console.log("error:" + error2);
                        res.redirect('/');
                    } else {
                    }
                });
                var queryString = 'select * from Nanum where nanum_id=?'
                connection.query(queryString, [req.params.id], function (error2, data) {
                    if (error2) {
                        console.log("???"+error2);
                        res.redirect('/');
                    } else {
                      randomNumber = Math.floor(Math.random() * (99999999-11111111))+11111111;
                      var queryString = 'insert into NanumList (auth_number, nanum_id, student_id, nanumer_id, kind, title, place, nanum_date, is_received) values (?, ?, ?, ?, ?, ?, ?, ?, ?)'
                      var params = [randomNumber, req.params.id, req.session.userID, data[0].writer, data[0].kind, data[0].title, data[0].place, data[0].nanum_date, 0];
                      connection.query(queryString, params, function (error2, rows) {
                          if (error2) {
                              console.log("error2:" + error2);
                              res.redirect('/');
                          }
                          else{
                            res.redirect('/apply/init');
                          }
                      });
                    }
                  });
              }
      else {
        res.redirect('/apply/init');
      }
    });


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
            userid: req.session.userID,
            data: data,
          });
        }

    })
  })

  return router;

};
