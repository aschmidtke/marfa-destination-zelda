INSERT INTO departments (name)
VALUES
('Management'),
('Front of House'),
('Back of House');

INSERT INTO roles (title, department_id, salary)
VALUES
('Manager', 1, 60),
('Server', 2, 50),
('Host', 2, 40),
('Cook', 3, 50),
('Dishwasher', 3, 40);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Kathy', 'Martin', 1, NULL),
('Ronny', 'Lora', 1, 1),
('Alberta', 'McBride', 2, 1),
('Alice', 'Hoffman', 2, 1),
('Derrick', 'Franklin', 2, 1),
('Andre', 'Talbot', 3, 2),
('David', 'Ragland', 3, 2),
('Mildred', 'Randolph', 4, 2),
('Anthony', 'Millan', 4, 2),
('Cindy', 'Anton', 5, 1);

