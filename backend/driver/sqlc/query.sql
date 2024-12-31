-- name: FindTodo :many
SELECT
  task_canvas.todo.id AS todo_id,
  task_canvas.todo.content AS content,
  task_canvas.todo.completed AS completed,
  task_canvas.todo.created_at AS created_at,
  task_canvas.user.id AS user_id,
  task_canvas.user.email AS email,
  task_canvas.user.password_hash AS password_hash
FROM
  task_canvas.todo
INNER JOIN
  task_canvas.user_todo ON task_canvas.todo.id = task_canvas.user_todo.todo_id
INNER JOIN
  task_canvas.user ON task_canvas.user_todo.user_id = task_canvas.user.id
WHERE
  task_canvas.user.id = sqlc.arg(user_id)::uuid
;

-- name: InsertTodo :exec
INSERT INTO task_canvas.todo (
  id,
  content,
  completed,
  created_at
)
VALUES (
  sqlc.arg(id)::uuid,
  sqlc.arg(content)::text,
  sqlc.arg(completed)::boolean,
  sqlc.arg(created_at)::timestamp
);

-- name: InsertUserTodo :exec
INSERT INTO task_canvas.user_todo (
  user_id,
  todo_id
)
VALUES (
  sqlc.arg(user_id)::uuid,
  sqlc.arg(todo_id)::uuid
);

-- name: UpdateTodo :exec
UPDATE task_canvas.todo
SET
  content = sqlc.arg(content)::text,
  completed = sqlc.arg(completed)::boolean
FROM task_canvas.user_todo
WHERE
  task_canvas.todo.id = task_canvas.user_todo.todo_id
  AND task_canvas.todo.id = sqlc.arg(todo_id)::uuid
  AND task_canvas.user_todo.user_id = sqlc.arg(user_id)::uuid
;

-- name: DeleteTodo :exec
WITH deleted_todos AS (
  DELETE FROM task_canvas.user_todo
  WHERE todo_id = sqlc.arg(todo_id)::uuid
  AND user_id = sqlc.arg(user_id)::uuid
  RETURNING todo_id
)
DELETE FROM task_canvas.todo
WHERE id IN (SELECT todo_id FROM deleted_todos)
;

-- name: InsertUser :exec
INSERT INTO task_canvas.user (
  id,
  email,
  password_hash
) VALUES (
  sqlc.arg(id)::uuid,
  sqlc.arg(email)::text,
  sqlc.arg(password_hash)::text
);

-- name: FindUserById :one
SELECT
  id,
  email,
  password_hash
FROM
  task_canvas.user
WHERE
  id = sqlc.arg(id)::uuid
;

-- name: FindUserByEmail :one
SELECT
  id,
  email,
  password_hash
FROM
  task_canvas.user
WHERE
  email = sqlc.arg(email)::text
;
