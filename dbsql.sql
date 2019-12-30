CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

INSERT INTO students (name)
VALUES ('James'),('Elsa Pataky');