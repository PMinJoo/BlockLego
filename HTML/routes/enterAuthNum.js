module.exports = function (app) {
  //인증번호 확인
  var express = require('express');
  var nodemailer = require('nodemailer');
  var router = express.Router();

  router.post("/", function(req, res){
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
  return router;
};
