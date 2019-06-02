//사용 모듈 로드
var express = require('express'); //웹서버 사용
var expressLayouts = require('express-ejs-layouts')
const nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var app = express();

app.locals.pretty = true; // html code readability
app.set('views', './assets');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(expressLayouts);
//app.use('/user', express.static('uploads'));
app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.urlencoded({extended:true}));


var router = require('./routes/index.js')(app);
var mailerRouter = require('./routes/nodemailerTest.js')(app);
var authRouter = require('./routes/enterAuthNum.js')(app);
app.use('/', router);
app.use('/nodemailerTest', mailerRouter);
app.use('/enterAuthNum', authRouter);

//포트 설정
app.listen(3303, function(){
  console.log('Server Start...');
})
