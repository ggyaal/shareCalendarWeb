package kr.co.shareCal.vo;

import javax.xml.bind.annotation.XmlRootElement;

import lombok.Data;

@Data
@XmlRootElement
public class MemberSortVO {
	private String userid;
	private String block;
	private String contents;
	
}
