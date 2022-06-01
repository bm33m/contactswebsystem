-- ---------------------------
-- contactsdb.sql
-- Create new db user.
-- Connect new db user.
-- Create new database.
-- Connect to new database.
-- Create tables.
-- Use the the new database and tables.
-- Enjoy.
-- --------------------------

CREATE ROLE contacts022 WITH LOGIN PASSWORD 'myc203pw';

ALTER ROLE contacts022 CREATEDB;

\connect - contacts022
myc203pw
\conninfo

CREATE DATABASE contactswebsystemdb;

\c contactswebsystemdb

CREATE TABLE usersdb (
userid SERIAL PRIMARY KEY,
name varchar (299) NOT NULL,
surname varchar (299),
username varchar (299) NOT NULL UNIQUE,
password varchar (299) NOT NULL,
contacts_identifier varchar (299) NOT NULL UNIQUE,
email varchar (299),
home_number varchar (30),
cell_number varchar (30),
title varchar (299) NOT NULL,
description TEXT,
soft_deleted varchar (3),
created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
id SERIAL PRIMARY KEY,
userid int NOT NULL UNIQUE REFERENCES usersdb (userid) on delete cascade,
name varchar (299) NOT NULL,
surname varchar (299),
soft_deleted varchar (3),
created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE loginusers (
loginid SERIAL PRIMARY KEY,
userid int NOT NULL REFERENCES users (userid) on delete cascade,
username varchar (299) NOT NULL UNIQUE,
password varchar (299) NOT NULL,
created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contacts (
contactsid SERIAL PRIMARY KEY,
userid int NOT NULL REFERENCES users (userid) on delete cascade,
contacts_identifier varchar (299) NOT NULL UNIQUE,
email varchar (299),
home_number varchar (30),
cell_number varchar (30),
created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notes (
notesid SERIAL PRIMARY KEY,
userid int NOT NULL REFERENCES users (userid) on delete cascade,
title varchar (299) NOT NULL,
description TEXT,
created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

\dt
-- 01
-- admin2021
-- admin2022
-- admin2020

INSERT INTO usersdb (name, surname, username, password, contacts_identifier, email, home_number, cell_number, title, description)
  VALUES ('Admin', 'Cool', 'admin01', '91a7cd2279fc628d96638ac0824852c1a5499ee6a9a053bc8a2e4a39e37e35dd+==', '631856a8-d2f9-4ad7-8559-76396a2e1a74', 'admin1@webapp.og', '0123456789', '0112345678', 'Super Title', 'Awesome cool description...'),
  ('Admin', 'Boolean', 'admin02', '1c0d9895352a7abd08506715b203f0fb902b14edf5bcd0e57cdf562f1c98cfd4+==', '8d33a967-45d3-4a34-ad99-5d101af8b32f', 'bool2@webapp.og', '0193456789', '0682345678', 'Cool Title', 'Very awesome cool description...'),
  ('Vula', 'Looc', 'admin04', '5fa82143dc8e27ba71d1eec7d2dcfee59a861fc386548038114e79fcd3a7391f+==', 'c6706583-7427-41f6-8588-997c3ce1f2d2', 'cool@webapp.og', '0133456789', '0113345678', 'Nice Title', 'Awesome nice cool description...'),
  ('Zula', 'Lapho', 'admin05', '09cbd7a593f14607848023ae0aabdadd134ee74aa03922ac09d35fb5eef4f910+==', '199cc03d-292f-453e-ad89-b62cd635625b', 'bool2@webapp.og', '0183456789', '0622345678', 'Best Title', 'Very nice awesome cool description...');

-- 02

INSERT INTO users (userid, name, surname)
  VALUES(1, 'Admin', 'Cool'),
  (2, 'Admin', 'Boolean'),
  (3, 'Vula', 'Looc'),
  (4, 'Zula', 'Lapho');

-- 03

INSERT INTO loginusers (userid, username, password)
  VALUES(1, 'admin01', '91a7cd2279fc628d96638ac0824852c1a5499ee6a9a053bc8a2e4a39e37e35dd+=='),
  (2, 'admin02', '1c0d9895352a7abd08506715b203f0fb902b14edf5bcd0e57cdf562f1c98cfd4+=='),
  (3, 'admin04', '5fa82143dc8e27ba71d1eec7d2dcfee59a861fc386548038114e79fcd3a7391f+=='),
  (4, 'admin05', '09cbd7a593f14607848023ae0aabdadd134ee74aa03922ac09d35fb5eef4f910+==');

-- 04

INSERT INTO contacts (userid, contacts_identifier, email, home_number, cell_number)
  VALUES(1, '631856a8-d2f9-4ad7-8559-76396a2e1a74', 'admin1@webapp.og', '0123456789', '0112345678'),
  (2, '8d33a967-45d3-4a34-ad99-5d101af8b32f', 'bool2@webapp.og', '0193456789', '0682345678'),
  (3, 'c6706583-7427-41f6-8588-997c3ce1f2d2', 'cool@webapp.og', '0133456789', '0113345678'),
  (4, '199cc03d-292f-453e-ad89-b62cd635625b', 'bool2@webapp.og', '0183456789', '0622345678');

-- 05

INSERT INTO notes (userid, title, description)
  VALUES(1, 'Super Title', 'Awesome cool description...'),
  (2, 'Cool Title', 'Very awesome cool description...'),
  (3, 'Nice Title', 'Awesome nice cool description...'),
  (4, 'Best Title', 'Very nice awesome cool description...');

--done


--Testing 123....


SELECT a.userid, a.name, a.surname, b.email, b.cell_number, c.title, c.description
  FROM users a, contacts b, notes c
  WHERE a.name = 'Admin'
  AND b.userid = a.userid
  AND c.userid = a.userid
  ORDER BY a.name;

SELECT a.userid, a.name, a.surname, b.email, b.cell_number, c.title, c.description
  FROM users a, contacts b, notes c
  WHERE a.surname = 'Lapho'
  AND b.userid = a.userid
  AND c.userid = a.userid
  ORDER BY a.surname;

SELECT a.userid, a.name, a.surname, b.email, b.cell_number, c.title, c.description
  FROM users a, contacts b, notes c
  WHERE b.email = 'cool@webapp.og'
  AND a.userid = b.userid
  AND c.userid = b.userid
  ORDER BY b.email;

-- done 2022.
