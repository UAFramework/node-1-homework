-- intall UUID plugin
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- create `tasks` table:
CREATE TABLE public.tasks (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	title text NULL,
	done bool NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT tasks_pk PRIMARY KEY (id),
  CONSTRAINT tasks_un UNIQUE (id)
);

-- insert records into `tasks` table:
insert into public.tasks (title, done)
values
	('Task #100', false),
	('Task #101', false),
	('Task #102', true),
	('Task #103', false),
	('Task #104', false),
	('Task #105', true),
	('Task #106', false),
	('Task #107', false)
;