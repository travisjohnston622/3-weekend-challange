CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	task VARCHAR (200) NOT NULL,
	notes VARCHAR (200) NOT NULL,
	completed VARCHAR (3) NOT NULL,
	date DATE NOT NULL,
);

INSERT INTO tasks (task, notes, completed, date)
VALUES ('laundry', 'seperate whites from colors', 'no', '12-1-19');

INSERT INTO tasks (task, notes, completed, date)
VALUES ('mow', 'set deck to 3.25 inches', 'no', '12-1-19');

INSERT INTO tasks (task, notes, completed, date)
VALUES ('build chicken coup', 'frame two foot on center', 'no', '12-1-19');