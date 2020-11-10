package kr.co.shareCal.vo;

import java.time.LocalDateTime;

import javax.xml.bind.annotation.XmlRootElement;

import lombok.Data;

@XmlRootElement
@Data
public class SelectDateVO {
	private String userid;
	private String name;
	private String title;
	private String nickName;
	private String disclosed;
	private LocalDateTime start;
	private LocalDateTime end;
	
}
