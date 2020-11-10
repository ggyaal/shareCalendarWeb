package kr.co.shareCal.vo;

import javax.xml.bind.annotation.XmlRootElement;

import lombok.Data;

@XmlRootElement
@Data
public class FriendVO {
	private String userid1;
	private String userid2;
	private String alert1;
	private String alert2;
	private int relationship1;
	private int relationship2;
}
