DROP DATABASE IF EXISTS management_db;
CREATE DATABASE management_db;

USE management_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,    -- Up to 99,999,999.99
    department_id INT,
    FOREIGN KEY (department_id)
      REFERENCES department(id)
      ON UPDATE CASCADE
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    mandager_id INT,
    FOREIGN KEY (role_id)
      REFERENCES role(id)
      ON UPDATE CASCADE,
    FOREIGN KEY (mandager_id)
      REFERENCES employee(id)
      ON UPDATE CASCADE
);