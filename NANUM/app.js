var express = require('express'); //웹서버 사용
var session = require('express-session')
var bodyParser = require('body-parser');
var app = express();

var mysql = require('mysql')

var connection = mysql.createConnection({
    host: "localhost", //서버 로컬 IP
    user: "root", //계정 아이디
    password: "1234", //계정 비밀번호
    database: "Block" //접속할 DB
})

var createSession = function createSession(){
  return function(req, res, next){
    if(!req.session.login){
      req.session.login = 'logout';
    }
    next();
  };
};

app.locals.pretty = true; // html code readability
app.set('views', './views');
app.set('view engine', 'ejs');
//app.use(expressLayouts);
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
  secret: '$%$%MyKey$%$%', //암호화 키
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 }, //쿠키 유지 시간 1시간
}));
app.use(createSession());

var router = require('./routes/index.js')(app);
var nanumstartRouter = require('./routes/nanumstart.js')(app);
var applyRouter = require('./routes/apply.js')(app);
var mypageRouter = require('./routes/mypage.js')(app);
app.use('/', router);
app.use('/nanum', nanumstartRouter);
app.use('/apply', applyRouter);
app.use('/mypage', mypageRouter);

//포트 설정
app.listen(3300, function(){
  console.log('Server Start...');
})
