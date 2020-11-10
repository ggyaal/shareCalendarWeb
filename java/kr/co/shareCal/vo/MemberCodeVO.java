package kr.co.shareCal.vo;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

import lombok.Data;

/*
CREATE TABLE membercode_tbl(
	userid varchar2(20),
	gender char(1) NOT NULL,
	phoneNo varchar2(20),
	birth DATE,
	photo varchar2(100),
	zipCode varchar2(100),
	addr1 varchar2(50),
	addr2 varchar2(50),
	regDate DATE NOT NULL,
	CONSTRAINT userid_code FOREIGN KEY(userid) REFERENCES member_tbl(userid) ON DELETE CASCADE
);
 */
@XmlRootElement
@Data
public class MemberCodeVO {
	private String userid;
	private String gender;
	private String phoneNo;
	private Date birth;
	private String photo;
	private String zipCode;
	private String addr1;
	private String addr2;
	private Date regDate;
	
}
