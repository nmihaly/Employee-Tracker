INSERT INTO department
(name)
VALUES
('Sales'),
('Engineering'),
('Legal'),
('Finance');

INSERT INTO role
(id, title, salary, department_id)
VALUES
(1, 'Sales Lead', 65000, 1),
(2, 'Salesperson', 45000, 1),
(3, 'Lead Engineer', 150000, 2),
(4, 'Software Engineer', 100000,2),
(5, 'Lawyer', 120000, 3),
(6, 'Legal Team Lead', 150000, 3),
(7, 'Accountant', 95000, 4);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
('James', 'Fraser', 1, NULL),
('Jack', 'London', 2, 1),
('Robert', 'Bruce', 2, 1),
('Peter', 'Greenaway', 3, NULL),
('Derek', 'Jarman', 4, 3),
('Paolo', 'Pasolini', 5, 6),
('Heathcote', 'Williams', 5, 6),
('Sandy', 'Powell', 6, NULL),
('Emil', 'Zola', 7, NULL);