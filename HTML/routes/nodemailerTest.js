module.exports = function (app) {

  var express = require('express');
  var nodemailer = require('nodemailer');
  var router = express.Router();
  let randomNumber = 000000;
  let email;

  router.post('/', function(req, res){
      email = req.body.userEmail;
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
