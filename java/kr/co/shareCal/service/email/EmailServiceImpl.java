package kr.co.shareCal.service.email;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

@Service("emailService")
public class EmailServiceImpl implements EmailService {

	private String managerEmailId = "ggyaal@gmail.com";
	
	@Autowired
	JavaMailSender mailSender;
	
	@Override
	public boolean sendMail(final String email, final String subject, final String content) {
		boolean isSend = false;
		MimeMessagePreparator preparator = new MimeMessagePreparator() {
            public void prepare(MimeMessage mimeMessage) throws Exception {
                mimeMessage.setFrom(new InternetAddress(managerEmailId));
                mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(email));
                mimeMessage.setSubject(subject);
                mimeMessage.setContent(content, "text/html;charset=UTF-8"); // 내용과 인코딩
            }
        };
        try {
        	mailSender.send(preparator);
        	isSend = true;
        }catch (Exception e) {
			isSend = false;
		}
		return isSend;
	}
	

	@Override
	public boolean sendMail(final String email, final String subject, final String content, final String[] fileNames, final boolean isFile) {
		boolean isSend = false;
		MimeMessagePreparator preparator = new MimeMessagePreparator() {
			 
	        public void prepare(MimeMessage mimeMessage) throws Exception {
	            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true,"UTF-8");
	            helper.setSubject(subject);
	            helper.setFrom(managerEmailId);
	            helper.setTo(email);

	            // 파일 첨부
	            if(isFile) {
	            	// 파일로 첨부
		            if(fileNames!=null && fileNames.length>0) {
		            	for(String fileName : fileNames) {
		            		helper.addAttachment(MimeUtility.encodeText(fileName), new ClassPathResource(fileName));
		            	}
		            }
		            helper.setText(content, true);
	            }else {
	            	// 메일 내용에 첨부 : 파일크기가 크면 파일로 첨부됨
	            	if(fileNames!=null && fileNames.length>0) {
	            		String body = "<html><body>" + content + "<br>";
		            	for(String fileName : fileNames) {
		            		body += "<img src='cid:" + MimeUtility.encodeText(fileName) + "'/><br>";
		            	}
		            	body += "</body></html>";
		            	helper.setText(body, true);
		            	
		            	for(String fileName : fileNames) {
		            		helper.addInline(MimeUtility.encodeText(fileName), new ClassPathResource(fileName));
		            	}
		            }
	            }
	        }
	    };
		
		try {
        	mailSender.send(preparator);
        	isSend = true;
        }catch (Exception e) {
			isSend = false;
		}
		return isSend;
	}

}
