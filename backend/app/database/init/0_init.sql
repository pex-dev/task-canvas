DO
$$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'developer') THEN
      CREATE USER developer WITH PASSWORD 'developer' SUPERUSER;
   END IF;
END
$$;

DO
$$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'task_canvas') THEN
      CREATE DATABASE task_canvas OWNER developer ENCODING 'UTF8';
   END IF;
END
$$;

GRANT ALL PRIVILEGES ON DATABASE task_canvas TO developer;

\c task_canvas;

CREATE SCHEMA IF NOT EXISTS task_canvas;