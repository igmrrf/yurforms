-- Common email patterns
INSERT INTO field_patterns (pattern, field_type, confidence) VALUES
('email', 'email', 0.9),
('e-mail', 'email', 0.9),
('email address', 'email', 0.9);

-- Common phone patterns
INSERT INTO field_patterns (pattern, field_type, confidence) VALUES
('phone', 'phone', 0.9),
('telephone', 'phone', 0.9),
('mobile', 'phone', 0.9),
('contact number', 'phone', 0.8);

-- Common date patterns
INSERT INTO field_patterns (pattern, field_type, confidence) VALUES
('date of birth', 'date', 0.9),
('dob', 'date', 0.9),
('birth date', 'date', 0.9);