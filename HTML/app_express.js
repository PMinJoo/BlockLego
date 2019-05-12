//사용 모듈 로드
var express = require('express'); //웹서버 사용
var app = express();

app.use(express.static(__dirname + '/assets'));

//포트 설정
app.listen(3303, function(){
  console.log('Server Start.');
})
