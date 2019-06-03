//사용 모듈 로드
var express = require('express'); //웹서버 사용
var expressLayouts = require('express-ejs-layouts')
const nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');

//DB 접속
  var connection = mysql.createConnection({
      host: "13.125.249.19", //서버 로컬 IP
      port: 53,
      user: "root", //계정 아이디
      password: "1234", //계정 비밀번호
      database: "Block" //접속할 DB
  })

app.locals.pretty = true; // html code readability
app.set('views', './views');
app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);
app.use(expressLayouts);
//app.use('/user', express.static('uploads'));
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended:true}));

var router = require('./routes/index.js')(app);
var mailerRouter = require('./routes/nodemailerTest.js')(app);
app.use('/', router);
app.use('/nodemailerTest', mailerRouter);

//포트 설정
app.listen(3303, function(){
  console.log('Server Start...');
})
