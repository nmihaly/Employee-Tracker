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
(first_name, last_name, role_id, manager)
VALUES
('James', 'Fraser', 1, NULL),
('Jack', 'London', 2, 'James Fraser'),
('Robert', 'Bruce', 2, 'James Fraser'),
('Peter', 'Greenaway', 3, NULL),
('Derek', 'Jarman', 4, 'Peter Greenaway'),
('Paolo', 'Pasolini', 5, 'Sandy Powell'),
('Heathcote', 'Williams', 5, 'Sandy Powel'),
('Sandy', 'Powell', 6, NULL),
('Emil', 'Zola', 7, NULL);