select userid, password, rank as enabled from member_tbl where userid='ggyaal@gmail.com';
select userid, auth from member_authority where userid='ggyaal@gmail.com';
select userid as username, auth as AUTHORITY from member_authority where userid='ggyaal@gmail.com';

-- password : 1234
INSERT INTO member_tbl VALUES ('ggyaal@gmail.com','$2a$10$KtvzBGmUyqap5BK.AHeiMOJjqemgMOYzzbhqDkujf39kCjRPz0pJe', '김안녕', 'kimHI', 0, 1);

insert into membercode_tbl
		(userid, gender, phoneNo, birth, zipCode, addr1, addr2, regDate)
	values
		('ggyaal@gmail.com', 'm', '01088888888', '1996-05-12', '11658', '경기도 성남시 분당구', '분당아파트 2034동 203호', SYSDATE );

UPDATE membercode_tbl SET PHONENO = '01099999999' WHERE USERID = 'admin@shareCal.do';