CREATE DATABASE dbDados;
USE dbDados;

CREATE TABLE tbl_registration(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(120),
    senha VARCHAR(10),
    email VARCHAR(100)
);

CREATE TABLE tbl_devs(
	id_devs INT PRIMARY KEY AUTO_INCREMENT,
    funcao VARCHAR(100),
    nome VARCHAR(130),
    foto VARCHAR(200),
    frase VARCHAR(250)
);

CREATE TABLE tbl_tasks(
	id_tasks INT PRIMARY KEY AUTO_INCREMENT,
    nomeTasks VARCHAR(150),
    tempo VARCHAR(50),
    relevancia VARCHAR(100),
    status VARCHAR(80)
);

CREATE TABLE tbl_users(
	id_users INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    usuario VARCHAR(100),
    senha VARCHAR(50)
);

CREATE TABLE tbl_usersTasks(
    id_usersTasks INT PRIMARY KEY AUTO_INCREMENT,
    id_tasks INT,
    id_users INT,
    horario VARCHAR(10),
    FOREIGN KEY (id_tasks) REFERENCES tbl_tasks(id_tasks),
    FOREIGN KEY (id_users) REFERENCES tbl_users(id_users)
);

