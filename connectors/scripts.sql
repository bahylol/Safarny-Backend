create table users(
	id serial,
	email character varying(50) unique,
	phone character varying(20),
	fname character varying(50),
	lname character varying(20),
	password character varying(128),
	salt character varying(32),
	birthdate Date,
	gender character varying(1),
	avatar character varying(2) DEFAULT 0,
    	reset_pass_token character varying(100),
	primary key(id)
);

create table traveler(
	id int,
	preferences text[],
	aboutme character varying(1000),
	foreign key (id) references users (id),
	primary key(id)
);

create table admin(
	id int ,
	foreign key (id) references users (id),
	primary key(id)
);

CREATE TABLE service(
	id serial,
	type character varying(50),
    primary key(id)
);

create table localguiderequest(
	request_id serial,
	national_id character varying(20) unique,
	request_email character varying(50),
	biography character varying(1000),
	country character varying(30),
	city character varying(30),
	resume character varying(30),
	status character varying(20),
	token character varying(50),
	admin_id int,
	foreign key (admin_id) references admin (id),
	primary key(request_id)
);

create table localguide(
	id int ,
	localguiderequest int,
	service_id int,
	foreign key (Localguiderequest) references localguiderequest (request_id),
	foreign key (service_id) references service (id),
	foreign key (id) references users (id),
	primary key(id)
);



create table trips(
	id serial,
    duration int,
    Destination character varying(100),
	country_code character varying(2),
    Month character varying(50),
    activities text[],
	days text[],
    budget int,
	primary key(id)
);

create table day(
	id serial,
    name text[],
    description text[],
    coordinates text[],
    images text[],
    cost text[],
    trip_id int,
    foreign key (trip_id) references trips (id),
	primary key(id)
);
CREATE table usertrips(
    user_id int,
    trip_id int,
	name character varying(50),
    primary key (user_id, trip_id),
    foreign key (user_id) references users (id),
    foreign key (trip_id) references trips (id)

);

create table ratings(
	id serial,
	service_id int,
	user_id int,
    rating int,
	foreign key (user_id) references users (id),
	foreign key (service_id) references service (id),
	primary key(id)
);

create table reviews(
	id serial,
	service_id int,
	user_id int,
    description character varying(1000),
	foreign key (user_id) references users (id),
	foreign key (service_id) references service (id),
	primary key(id)
);

CREATE TABLE posts (
    id serial,
    user_id int,
	title character varying(50),
	country character varying(30),
	city character varying(30),
    postdate timestamp, 
	tags text[],
    images text[],
    description character varying(1000),
    foreign key (user_id) references users (id),
    primary key(id)
);

CREATE TABLE comments (
    id serial,
    commentdate timestamp,
    user_id int,
    post_id int,
    comment character varying(1000),
    FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id),
    PRIMARY KEY (id)
);

create table updownvotes(
	id serial,
	user_id int,
	post_id int,
	upordown int,
	foreign key (post_id) references posts (id) ON DELETE CASCADE,
	foreign key (user_id) references users (id),
	primary key(id)
);

create table messages(
	id serial,
	sender int,
	reciever int,
	content character varying(200),
	messgedate timestamp, 
	primary key(id)
);

create table packages(
	id serial,
	name character varying(50),
	details character varying(1000),
	transportation boolean,
	meals boolean,
	photography boolean,
	languages character varying(1000),
	price double precision,
	localguide_id int,
	foreign key (localguide_id) references localguide (id),
	primary key(id)
);

create table transactions(
	id serial,
	from_id int,
	to_id int,
	amount double precision,
	token character varying(50),
	status character varying(50),
	date date,
	type character varying(50),
	foreign key (from_id) references users (id),
	foreign key (to_id) references users (id),
	primary key(id)
);

create table booklocalguide(
	id serial,
	transaction_id int,
	package_id int,
	date date,
	quantity int,
	status character varying(20),
	foreign key (transaction_id) references transactions (id),
	foreign key (package_id) references packages (id) ON DELETE CASCADE,
	primary key(id)
);

create table follows(
	id serial,
	follower int,
	following int,
	foreign key (follower) references users (id),
	foreign key (following) references users (id),
	primary key(id)
);

create table companyrequest(
	companyrequest_id serial,
	about character varying(1000),
	request_email character varying(50),
	country character varying(30),
	city character varying(30),
	documents  character varying(1000),
	status character varying(20),
	token character varying(50),
	admin_id int,
	foreign key (admin_id) references admin (id),
	primary key(companyrequest_id)
);

create table company(
	id int,
	companyrequest_id int,
	service_id int,
	foreign key (id) references users (id),
	foreign key (companyrequest_id) references companyrequest (companyrequest_id),
	foreign key (service_id) references service (id),
	primary key(id)
);

create table requestquote(
	id serial,
	company_id int,
	user_id int,
    trip_id int,
	start_date date,
	status character varying(30),
	price double precision,
    foreign key (user_id, trip_id) references usertrips(user_id, trip_id),
	foreign key (company_id) references company (id),
	primary key(id)
);

create table booktrip(
	id serial,
	requestquote_id int,
	transaction_id int,
	status character varying(30),
	quantity int,
	foreign key (requestquote_id) references requestquote (id),
	foreign key (transaction_id) references transactions (id),
	primary key(id)
);