CREATE TABLE task_canvas.user (
    id uuid primary key,
    email text not null unique,
    password_hash text not null
);

CREATE TABLE task_canvas.todo (
    id uuid primary key,
    content text not null,
    completed boolean not null
);

CREATE TABLE task_canvas.user_todo (
    user_id uuid references task_canvas.user(id),
    todo_id uuid references task_canvas.todo(id)
);

CREATE TABLE task_canvas.tag (
    id uuid primary key,
    name text not null
);

CREATE TABLE task_canvas.todo_tag (
    todo_id uuid references task_canvas.todo(id),
    tag_id uuid references task_canvas.tag(id)
);
