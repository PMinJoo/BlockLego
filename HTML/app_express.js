//사용 모듈 로드
var express = require('express'); //웹서버 사용
var app = express();

const nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.urlencoded({extended:true}));

//서버가 html 렌더링을 할 때, EJS 엔진을 사용하도록 설정
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.post("/nodemailerTest", function(req, res, next){
    let email = req.body.userEmail;
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

//인증번호 확인
app.post("/enterAuthNum", function(req, res){
  let authNum = req.body.authNumber;

  if(randomNumber == authNum){
    res.redirect("single-project2.html");
  }
  else{
    res.send('<script type="text/javascript">alert("인증번호가 올바르지 않습니다. 다시 시도해 주세요.");document.location.href="single-project.html";</script>');
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


//포트 설정
app.listen(3303, function(){
  console.log('Server Start...');
})
