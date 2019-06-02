var express = require('express'); //웹서버 사용
//var expressLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser');
var app = express();

app.locals.pretty = true; // html code readability
app.set('views', './views');
app.set('view engine', 'ejs');
//app.use(expressLayouts);
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended:true}));

var router = require('./routes/index.js')(app);
app.use('/', router);

//포트 설정
app.listen(3300, function(){
  console.log('Server Start...');
})
