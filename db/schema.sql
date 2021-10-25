DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(20) NOT NULL,
    department INTEGER NOT NULL,
    role_id INTEGER NOT NULL,
    salary INTEGER NOT NULL
 );

 CREATE TABLE employees (
     id INTEGER AUTO_INCREMENT PRIMARY KEY,
     first_name VARCHAR(20) NOT NULL,
     last_name VARCHAR(20) NOT NULL,
     department INTEGER,
     role_id INTEGER NOT NULL,
     salary INTEGER NOT NULL,
     manager VARCHAR(30)
 );