create schema task_canvas;

create table task_canvas.user (
  id uuid primary key,
  email text not null unique,
  password_hash text not null
);

create table task_canvas.todo (
  id uuid primary key,
  content text not null,
  completed boolean not null
);

create table task_canvas.user_todo (
  user_id uuid references task_canvas.user(id),
  todo_id uuid references task_canvas.todo(id)
);

create table task_canvas.tag (
  id uuid primary key,
  name text not null
);

create table task_canvas.todo_tag (
  todo_id uuid references task_canvas.todo(id),
  tag_id uuid references task_canvas.tag(id)
);
