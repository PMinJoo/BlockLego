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
		script.println("alert('�α����� ���ּ���.');");
		//script.println("location.href = 'userLogin.jsp'");
		script.println("</script>");
		script.close();
		return;
	}
	
	//���� ������ȣ ����
	Random random = new Random();
	int randomNum = random.nextInt(9000) + 1000; //���� : 1000~9999
	
	
	// ����ڿ��� ���� �޽����� �����մϴ�.
		String host = "http://localhost:8080/BlockLego/";
		String from = "blocklego02@gmail.com";
		String to = userEmail;
		String subject = "BlockLego���� �߼��� �̸��� Ȯ�� �����Դϴ�.";
		String content = "Ȩ�������� ���ư� ������ȣ�� �Է��� �ּ��� : " + randomNum;

		// SMTP�� �����ϱ� ���� ������ �����մϴ�.
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
			script.println("alert('������ �߻��߽��ϴ�..');");
			script.println("history.back();");
			script.println("</script>");
			script.close();		
		    return;
		}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <title></title>
    <meta charset="utf-8">
  </head>
  <script language='javascript'>
  	function submitAuthNum(){  		
  		var send = "<%=randomNum%>";
  		alert(send);
  	}
  </script>
  <body>
	<div class="container">
	    <div class="alert alert-success mt-4" role="alert">
		  �̸��� �ּ� ���� ������ ���۵Ǿ����ϴ�. �̸����� �а� ���� ��ȣ�� �ۼ��� �ּ���.<br>
		 <form>
		 	������ȣ �Է�<br>
        	<input type="text" name="authNumber">
        	<input type="button" value="submit" onclick='submitAuthNum()'>
		 </form>
		 
		</div>
    </div>
  </body>

</html>

