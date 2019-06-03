module.exports = function (app) {

  var express = require('express');
  var nodemailer = require('nodemailer');
  var router = express.Router();
  var mysql = require('mysql');
  let randomNumber = 000000;
  let email;

  var connection = mysql.createConnection({
      host: "192.168.240.1", //서버 로컬 IP
      port: 3303,
      user: "root", //계정 아이디
      password: "1234", //계정 비밀번호
      database: "Block" //접속할 DB
  })

  router.post('/', function(req, res){
      email = req.body.userEmail+"@dongguk.edu";
  		res.status(200);
      var queryString = 'select * from Web where dongguk_webmail=?'
      connection.query(queryString, [email], function (error2, data) {
  			if (error2) {
  				console.log(error2);
  				res.redirect('/');
  			} else if (!data[0]) {
          randomNumber = Math.floor(Math.random() * (999999-111111))+111111;

          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'blocklego02pj@gmail.com',
              pass: 'blocklego_pjNodejs0512'
            }
          });

          let mailOptions ={
            from: 'blocklego02pj@gmail.com',
            to: email,
            subject: 'BlockLego에서 발송한 확인 메일입니다.',
            text: '홈페이지로 돌아가 인증번호를 입력해 주세요 : ' + randomNumber
          };

          transporter.sendMail(mailOptions, function(err, info){
            if(error){
              console.log(error);
            }
            else{
              console.log('Email sent: ' + info.response);
            }
          });
          res.redirect("userRegister.html");
  			} else {
  				res.send('<script type="text/javascript">alert("이미 존재하는 아이디 입니다.");document.location.href="/single-project.html";</script>');
        }
  		});
  })


  router.post("/enterAuthNum", function(req, res){
    let authNum = req.body.authNumber;

    if(randomNumber == authNum){
      res.redirect("/single-project2.html");
    }
    else{
      res.send('<script type="text/javascript">alert("인증번호가 올바르지 않습니다. 다시 시도해 주세요.");document.location.href="/single-project.html";</script>');
      //res.render('read', {title:'인증번호 조회', pass:false})
    }

    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log(error);
      }
      else{
        console.log('authenticated');
      }
    });
    //res.redirect("userRegister.html");
  })

  router.post("/signIn", function(req, res){
    let inputName = req.body.inputName;
    let studentNumber = req.body.inputStudentNumber;
    let phone = req.body.inputPhone;
    let password = req.body.userPwd;

    res.send('<script type="text/javascript">alert("회원가입이 완료되었습니다.");document.location.href="/index.html";</script>');

  })
  //module.exports = router;


  return router;
};
