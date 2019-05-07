<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ page import="util.SHA256" %>
<%@ page import="java.io.PrintWriter" %>
<%
	request.setCharacterEncoding("UTF-8");
	//String userID = "test1";
	String userEmail = null;
	if(request.getParameter("userEmail") != null){
		userEmail = (String)request.getParameter("userEmail");
		
		session.setAttribute("userEmail", userEmail);
		PrintWriter script = response.getWriter();
		script.println("<script>");
		script.println("location.href = 'emailSendAction.jsp';");
		script.println("</script>");
		script.close();
	}
	else{
		PrintWriter script = response.getWriter();
		script.println("<script>");
		script.println("alert('이메일을 입력해주세요.');");
		script.println("history.back();");
		script.println("</script>");
		script.close();
	}
%>