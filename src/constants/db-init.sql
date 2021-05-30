DROP DATABASE IF EXISTS tennisapp;
CREATE DATABASE tennisapp;
ALTER DATABASE tennisapp DEFAULT CHARACTER SET UTF8 DEFAULT COLLATE UTF8_GENERAL_CI;
use tennisapp;

CREATE TABLE `user` ( 
    `email` varchar(40) NOT NULL, 
    `password` varchar(60) NOT NULL, 
    `name` varchar(40), 
    `createdAt` varchar(60), 
    `updatedAt` varchar(60) 
    )