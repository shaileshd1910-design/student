CREATE DATABASE students;

USE students;

/* =========================
   USERS TABLE
========================= */

CREATE TABLE users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    username VARCHAR(100) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    role ENUM('admin','user') NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

/* =========================
   STUDENTS TABLE
========================= */

CREATE TABLE students (

    id INT AUTO_INCREMENT PRIMARY KEY,

    student_id VARCHAR(50),

    student_name VARCHAR(100),

    father_name VARCHAR(100),

    mother_name VARCHAR(100),

    mobile VARCHAR(20),

    email VARCHAR(100),

    gender VARCHAR(20),

    dob DATE,

    caste VARCHAR(50),

    category VARCHAR(50),

    aadhaar VARCHAR(30),

    course VARCHAR(100),

    year VARCHAR(10),

    admission_date DATE,

    total_fees DECIMAL(10,2) DEFAULT 0,

    paid_amount DECIMAL(10,2) DEFAULT 0,

    pending_amount DECIMAL(10,2) DEFAULT 0,

    scholarship DECIMAL(10,2) DEFAULT 0,

    address TEXT,

    photo VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

/* =========================
   DEPARTMENTS TABLE
========================= */

CREATE TABLE departments (

    id INT AUTO_INCREMENT PRIMARY KEY,

    department_name VARCHAR(100),

    department_code VARCHAR(20)

);

INSERT INTO departments (

    department_name,
    department_code

)

VALUES

('B.Pharmacy','BPH'),
('D.Pharmacy','DPH'),
('M.Pharmacy','MPH');

/* =========================
   FEES TABLE
========================= */

CREATE TABLE fees (

    id INT AUTO_INCREMENT PRIMARY KEY,

    student_id VARCHAR(50),

    student_name VARCHAR(100),

    department VARCHAR(100),

    total_fees DECIMAL(10,2),

    received_amount DECIMAL(10,2),

    pending_amount DECIMAL(10,2),

    payment_date DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);