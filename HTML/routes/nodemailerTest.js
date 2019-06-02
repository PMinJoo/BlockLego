module.exports = function (app) {

  var express = require('express');
  var nodemailer = require('nodemailer');
  var router = express.Router();
  let randomNumber = 000000;

  router.post('/nodemailerTest', function(req, res){
      let email = req.body.userEmail;
      randomNumber = Math.floor(Math.random() * (999999-111111))+111111;

      let transporter = nodemailer.createTransport{(
        service: 'gmail',
        auth: {
          user: 'blocklego02pj@gmail.com',
          pass: 'blocklego_pjNodejs0512'
        }
      )};

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

  //module.exports = router;


  return router;
};
