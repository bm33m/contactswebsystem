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
userid int NOT NULL,
name varchar (299) NOT NULL,
surname varchar (299),
soft_deleted varchar (3),
created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE loginusers (
loginid SERIAL PRIMARY KEY,
userid int NOT NULL,
username varchar (299) NOT NULL UNIQUE,
password varchar (299) NOT NULL,
created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contacts (
contactsid SERIAL PRIMARY KEY,
userid int NOT NULL,
contacts_identifier varchar (299) NOT NULL UNIQUE,
email varchar (299),
home_number varchar (30),
cell_number varchar (30),
created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notes (
notesid SERIAL PRIMARY KEY,
userid int NOT NULL,
title varchar (299) NOT NULL,
description TEXT,
created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
