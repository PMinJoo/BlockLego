<%@page import="java.util.*" %>
<%@page import="javax.mail.Transport"%>
<%@page import="javax.mail.Message"%>
<%@page import="javax.mail.Address"%>
<%@page import="javax.mail.internet.InternetAddress"%>
<%@page import="javax.mail.internet.MimeMessage"%>
<%@page import="javax.mail.Session"%>
<%@page import="javax.mail.Authenticator"%>
<%@page import="java.util.Properties"%>
<%@page import="java.io.PrintWriter"%>
<%@page import="util.SHA256"%>
<%@page import="util.Gmail"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%
	String userEmail = null;
	if(session.getAttribute("userEmail")!=null){
		userEmail = (String)session.getAttribute("userEmail");
	}
	if(userEmail == null){
		PrintWriter script = response.getWriter();
		script.println("<script>");
		script.println("alert('로그인을 해주세요.');");
		//script.println("location.href = 'userLogin.jsp'");
		script.println("</script>");
		script.close();
		return;
	}

	//랜덤 인증번호 생성
	Random random = new Random();
	int randomNum = random.nextInt(900000) + 100000; //범위 : 100000~999999


	// 사용자에게 보낼 메시지 기입
		String host = "http://localhost:8080/BlockLego/";
		String from = "blocklego02@gmail.com";
		String to = userEmail;
		String subject = "BlockLego에서 발송한 확인 메일입니다.";
		String content = "홈페이지로 돌아가 인증번호를 입력해 주세요 : " + randomNum;

		// SMTP에 접속하기 위한 정보를 기입
		Properties p = new Properties();
		p.put("mail.smtp.user", from);
		p.put("mail.smtp.host", "smtp.googlemail.com");
		p.put("mail.smtp.port", "465");
		p.put("mail.smtp.starttls.enable", "true");
		p.put("mail.smtp.auth", "true");
		p.put("mail.smtp.debug", "true");
		p.put("mail.smtp.socketFactory.port", "465");
		p.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		p.put("mail.smtp.socketFactory.fallback", "false");

		try{
		    Authenticator auth = new Gmail();
		    Session ses = Session.getInstance(p, auth);
		    ses.setDebug(true);
		    MimeMessage msg = new MimeMessage(ses);
		    msg.setSubject(subject);
		    Address fromAddr = new InternetAddress(from);
		    msg.setFrom(fromAddr);
		    Address toAddr = new InternetAddress(to);
		    msg.addRecipient(Message.RecipientType.TO, toAddr);
		    msg.setContent(content, "text/html;charset=UTF-8");
		    Transport.send(msg);
		} catch(Exception e){
		    e.printStackTrace();
			PrintWriter script = response.getWriter();
			script.println("<script>");
			script.println("alert('오류가 발생했습니다...');");
			script.println("history.back();");
			script.println("</script>");
			script.close();
		    return;
		}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description" content="">
    <meta name="author" content="">

	<title>BlockLego</title>

	<!-- Standard Favicon -->
	<link rel="icon" type="image/x-icon" href="assets/images//favicon.ico" />

	<!-- For iPhone 4 Retina display: -->
	<link rel="apple-touch-icon-precomposed" href="assets/images//apple-touch-icon-114x114-precomposed.png">

	<!-- For iPad: -->
	<link rel="apple-touch-icon-precomposed" href="assets/images//apple-touch-icon-72x72-precomposed.png">

	<!-- For iPhone: -->
	<link rel="apple-touch-icon-precomposed" href="assets/images//apple-touch-icon-57x57-precomposed.png">

	<!-- Library - Google Font Familys -->
	<link href="https://fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i%7cPoppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i%7cRoboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i%7cQuestrial%7cOpen+Sans:300,300i,400,400i,600,600i,700,700i,800,800i%7cPT+Sans:400,400i,700,700i" rel="stylesheet">

	<!-- Library -->
    <link href="assets/css/lib.css" rel="stylesheet">

	<!-- Custom - Common CSS -->
	<link rel="stylesheet" href="assets/css/rtl.css">
	<link rel="stylesheet" type="text/css" href="style.css">

	<!--[if lt IE 9]>
		<script src="js/html5/respond.min.js"></script>
    <![endif]-->

</head>
  <script language='javascript'>
  	function submitAuthNum(){
  		var server = "<%=randomNum%>";
  		var client = document.getElementsByName('authNumber')[0].value;

  		if (server.toString() == client.toString()){
  			alert("인증에 성공하였습니다. 확인 버튼을 누르면 회원가입 페이지로 이동합니다.");
  			document.location.href="single-project2.html";
  		} else {
  			alert("인증에 실패하였습니다!");
  		}
  	}
  </script>

  <body data-offset="200" data-spy="scroll" data-target=".ownavigation">
	<!-- Loader -->
	<div id="site-loader" class="load-complete">
		<div class="loader">
			<div class="line-scale"><div></div><div></div><div></div><div></div><div></div></div>
		</div>
	</div><!-- Loader /- -->

	<!-- Sidebar Menu -->
	<div class="sidebar-menu">
		<!-- Logo Block -->
		<div class="logo-block">
			<a href="index.html"><img src="assets/images/logo.png" alt="Logo" /></a>
			<p>2019 DGU Capstone Design
			Personal identity verification</p>
		</div><!-- Logo Block /- -->
		<!-- Header Section -->
		<div class="header_s">
			<nav class="navbar ownavigation navbar-expand-lg">
				<a class="image-logo navbar-brand" href="index.html"><img src="assets/images/logo.png" alt="Logo" /></a>
				<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="true" aria-label="Toggle navigation">
					<i class="fa fa-bars"></i>
				</button>
				<div class="collapse navbar-collapse" id="navbar">
					<ul class="navbar-nav">
						<li class="dropdown">
							<i class="ddl-switch fa fa-angle-down"></i>
							<a class="nav-link dropdown-toggle" title="Home" href="index.html">Home</a>
							<ul class="dropdown-menu">
								<li><a class="dropdown-item" href="index.html" title="Home">Home</a></li>
							</ul>
						</li>
						<li class="dropdown">
							<i class="ddl-switch fa fa-angle-down"></i>
							<a class="nav-link dropdown-toggle" title="About" href="#">About</a>
							<ul class="dropdown-menu">
								<li><a class="dropdown-item" href="about.html" title="About Us">About Project</a></li>
								<li><a class="dropdown-item" href="about2.html" title="About Us">About Team</a></li>
							</ul>
						</li>
						<li class="dropdown">
							<i class="ddl-switch fa fa-angle-down"></i>
							<a class="nav-link dropdown-toggle" title="Work" href="#">Join</a>
							<ul class="dropdown-menu">
								<li><a class="dropdown-item" href="single-project.html" title="Single Project">Join Us!</a></li>
							</ul>
						</li>
						<li class="dropdown">
							<i class="ddl-switch fa fa-angle-down"></i>
							<a class="nav-link dropdown-toggle" title="Services" href="#">Services</a>
							<ul class="dropdown-menu">
								<li><a class="dropdown-item" href="services.html" title="Services1">Services 1</a></li>
								<li><a class="dropdown-item" href="services-2.html" title="Services2">Services 2</a></li>
							</ul>
						</li>
						<li><a class="nav-link" title="Contact" href="contact-us.html">Contact</a></li>
					</ul>
				</div>
			</nav>
		</div><!-- Header Section /- -->
		<div class="filter-menu"></div>
		<div class="footer-detail"></div>
	</div><!-- Sidebar Menu /- -->

	<div class="main-container">

		<main class="site-main">

			<!-- Page Content -->
			<div class="page-content">

				<!-- Page Banner -->
				<div class="container-fluid no-left-padding no-right-padding page-banner">
					<!-- Container -->
					<div class="container">
						<h3>Start BlockLego</h3>
						<nav class="breadcrumb">
							<a class="breadcrumb-item" href="index.html">Home</a>
							<a class="breadcrumb-item" href="#">Join</a>
							<span class="breadcrumb-item active">Join Us!</span>
						</nav>
					</div><!-- Container -->
				</div><!-- Page Banner /- -->
				
				<!-- Signle Project -->
				<div class="container-fluid no-left-padding no-right-padding single-project">
					<div class="single-content">
						<div class="row">
							<h3>Dongguk University Webmail</h3>
						</div>
						<form>
							<p><p>
							<div class="form-row">
						    <div class="form-group col-md-6">
						      <label for="inputNumber">Certification Number</label>
						      <input type="text" class="form-control" name="authNumber" placeholder="������ȣ�� �Է��ϼ���">
						    </div>
						  </div>
							<div class="form-row">
									<button type="button" class="btn btn-primary" onclick='submitAuthNum()'>Submit</button>
							</div>
						</form>
					</div>
				</div><!-- Signle Project /- -->

			</div><!-- Page Content /- -->

		</main>

	</div>

	<!-- Footer Section -->
	<div class="container-fluid footer-main">
		<h3>Social Network</h3>
		<ul>
			<li><a href="http://www.dongguk.edu" target="_blank" title=""><i class="fa fa-university"></i></a></li>
			<li><a href="https://github.com/PMinJoo/BlockLego" target="_blank" title=""><i class="fa fa-github"></i></a></li>
			<li><a href="http://ssms.dongguk.edu/" target="_blank" title=""><i class="fa fa-commenting-o"></i></a></li>
			<li><a href="http://naver.me/FRVSoCJP" target="_blank" title=""><i class="fa fa-map-marker"></i></a></li>
		</ul>
		<p>&copy; 2019 BlockLego, Dongguk University</p>
	</div><!-- Footer Section /- -->

	<!-- JQuery v1.12.4 -->
	<script src="assets/js/jquery-1.12.4.min.js"></script>

	<!-- Library - Js -->
	<script src="assets/js/popper.min.js"></script>
	<script src="assets/js/lib.js"></script>

	<!-- Library - Theme JS -->
	<script src="assets/js/functions.js"></script>

</body>
</html>
