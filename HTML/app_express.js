//사용 모듈 로드
var express = require('express'); //웹서버 사용
var app = express();

const nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/assets'));

//----이메일 보내기
app.post("/nodemailerTest", function(req, res){
  let email = req.body.userEmail;
  //let randomNumber = Math.floor(Math.random() * (999999-111111))+111111;
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
      user: 'blocklego02pj@gmail.com',
      pass: 'blocklego_pjNodejs0512'
    }
  });

  let mailOptions = {
    from: 'blocklego02pj@gmail.com',
    to: email,
    subject: 'BlockLego에서 발송한 확인 메일입니다.',
    text: '홈페이지로 돌아가 인증번호를 입력해 주세요 : '// + randomNumber
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
    }
    else{
      console.log('Email sent: ' + info.response);
    }
  });
  res.redirect("/");
})


//포트 설정
app.listen(3303, function(){
  console.log('Server Start.');
})
