var express = require('express'); //웹서버 사용
var app = express();
app.use(express.static(__dirname + '/NANUMLEGO'));

//포트 설정
app.listen(3300, function(){
  console.log('Server Start...');
})
