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

var router = require('./routes/index.js')(app);
app.use('/', router);


//포트 설정
app.listen(3303, function(){
  console.log('Server Start...');
})
