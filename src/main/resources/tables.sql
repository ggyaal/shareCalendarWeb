DROP TABLE member_tbl;
DROP SEQUENCE member_plan_id_seq;
DROP TABLE member_plan;
DROP TABLE friend_tbl;
DROP TABLE membercode_tbl;
DROP TABLE member_authority;
DROP TABLE authoritycode_tbl;
DROP TABLE member_sortable;
DROP TABLE member_contents;

CREATE TABLE member_tbl(
	userid varchar2(20) PRIMARY KEY,
	password varchar2(80) NOT NULL,
	name varchar2(10) NOT NULL,
	nickName varchar2(10) UNIQUE NOT NULL,
	lv NUMBER DEFAULT 0,
	enabled NUMBER DEFAULT 1
);

CREATE TABLE friend_tbl(
	userid1 varchar2(20),
	userid2 varchar2(20),
	alert1 varchar2(50),
	alert2 varchar2(50),
	relationship1 NUMBER DEFAULT 0,
	relationship2 NUMBER DEFAULT 0,
	PRIMARY KEY(userid1, userid2)
);

CREATE SEQUENCE member_plan_id_seq;

CREATE TABLE member_plan(
	id number PRIMARY KEY,
	userid varchar2(20),
	title varchar2(20) NOT NULL,
	description varchar2(2000),
	"start" timestamp NOT NULL,
	"end" timestamp NOT NULL,
	"type" varchar2(30) NOT NULL,
	name varchar2(20) NOT NULL,
	nickName varchar2(20) NOT NULL,
	backgroundColor varchar2(10) DEFAULT '#71A280',
	textColor varchar2(10) DEFAULT '#FFFFFF',
	allDay char(1) CONSTRAINT boolean_check CHECK(allDay IN ('T', 'F')),
	disclosed varchar2(15) NOT NULL,
	CONSTRAINT userid_plan FOREIGN KEY(userid) REFERENCES member_tbl(userid) ON DELETE CASCADE
);

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

CREATE TABLE authoritycode_tbl(
	userid varchar2(20),
	codeNo NUMBER NOT NULL,
	authcode varchar2(20) NOT NULL,
	wCount char(1) NOT NULL,
	PRIMARY KEY(userid, codeNo),
	CONSTRAINT userid_authcode FOREIGN KEY(userid) REFERENCES member_tbl(userid) ON DELETE CASCADE
);

CREATE TABLE member_authority(
	userid varchar2(20),
	auth varchar2(20) NOT NULL,
	CONSTRAINT userid_auth FOREIGN KEY(userid) REFERENCES member_tbl(userid) ON DELETE CASCADE
);

CREATE TABLE member_sortable(
	userid varchar2(20),
	block varchar2(10),
	contents varchar2(100),
	PRIMARY KEY(userid, block),
	CONSTRAINT sortable FOREIGN KEY(userid) REFERENCES member_tbl(userid) ON DELETE CASCADE
);

CREATE TABLE member_contents(
	userid varchar2(20),
	content varchar2(10),
	cTitle varchar2(20),
	cBody varchar2(2000),
	color varchar2(15),
	PRIMARY KEY(userid, content),
	CONSTRAINT contents FOREIGN KEY(userid) REFERENCES member_tbl(userid) ON DELETE CASCADE
);