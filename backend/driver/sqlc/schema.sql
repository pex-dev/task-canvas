create schema task_canvas;

create table task_canvas.todo (
  id uuid primary key,
  content text not null,
  completed boolean not null
);