INSERT INTO departments (name)
VALUES
('Management'),
('Front of House'),
('Back of House');

INSERT INTO roles (title, department, role_id, salary)
VALUES
('Manager', 1, 1, 60),
('Server', 2, 2, 50),
('Host', 2, 3, 40),
('Cook', 3, 4, 50),
('Dishwasher', 3, 5, 40);

INSERT INTO employees (first_name, last_name, department, role_id, salary, manager)
VALUES
('Kathy', 'Martin', 1, 1, 60, NULL),
('Ronny', 'Lora', 1, 1, 60, NULL),
('Alberta', 'McBride', 2, 2, 50, 'Kathy Martin'),
('Alice', 'Hoffman', 2, 2, 50, 'Kathy Martin'),
('Derrick', 'Franklin', 2, 2, 50, 'Kathy Martin'),
('Andre', 'Talbot', 2, 3, 40, 'Ronny Lora'),
('David', 'Ragland', 2, 3, 40, 'Ronny Lora'),
('Mildred', 'Randolph', 3, 4, 50, 'Kathy Martin'),
('Anthony', 'Millan', 3, 4, 50, 'Kathy Martin'),
('Cindy', 'Anton', 3, 5, 40, 'Kathy Martin');

