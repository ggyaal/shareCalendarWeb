package kr.co.shareCal.service.email;

public interface EmailService {
	boolean sendMail(String email, String subject, String content);
	boolean sendMail(String email, String subject, String content,String[] fileNames, boolean isFile);
}
