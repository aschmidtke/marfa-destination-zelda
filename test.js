DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;


CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(20) NOT NULL,
    role_id INTEGER NOT NULL,
    department VARCHAR(20) NOT NULL,
    salary INTEGER NOT NULL
    FOREIGN KEY (department) REFERENCES departments(id)
 );
 
 CREATE TABLE employees (
     id INTEGER AUTO_INCREMENT PRIMARY KEY,
     first_name VARCHAR(20) NOT NULL,
     last_name VARCHAR(20) NOT NULL,
     department VARCHAR(20) NOT NULL,
     salary INTEGER NOT NULL,
     manager VARCHAR(30)
     FOREIGN KEY (department) REFERENCES departments(id)
 );

 --INSERT INTO roles ()
--('Managers'),
--('Servers'),
--('Hosts'),
--('Cooks')
--('Dishwashers');