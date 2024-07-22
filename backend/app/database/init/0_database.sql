grant all privileges on database task_canvas to developer;

\c task_canvas developer;

CREATE SCHEMA IF NOT EXISTS task_canvas;

CREATE TABLE IF NOT EXISTS task_canvas.todo (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    content text NOT NULL,
    completed boolean NOT NULL,
);