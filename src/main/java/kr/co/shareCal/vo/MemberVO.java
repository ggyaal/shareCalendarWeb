package kr.co.shareCal.vo;

import javax.xml.bind.annotation.XmlRootElement;

import lombok.Data;

/*
CREATE TABLE member_tbl(
	userid varchar2(20) PRIMARY KEY,
	password varchar2(80) NOT NULL,
	name varchar2(10) NOT NULL,
	nickName varchar2(10) NOT NULL,
	lv NUMBER DEFAULT 0,
	enabled NUMBER DEFAULT 1
);
 */
@XmlRootElement
@Data
public class MemberVO {
	private String userid;
	private String password;
	private String name;
	private String nickName;
	private int lv;
	private int enabled;
	private MemberCodeVO memberCode;

}
