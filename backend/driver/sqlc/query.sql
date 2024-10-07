-- name: FindTodo :many
SELECT
  task_canvas.todo.id AS todo_id,
  task_canvas.todo.content AS content,
  task_canvas.todo.completed AS completed,
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
  completed
)
VALUES (
  $1,
  $2,
  $3
);

-- name: UpdateTodo :exec
UPDATE task_canvas.todo
SET
  content = $2,
  completed = $3
WHERE
  id = $1
;

-- name: DeleteTodo :exec
DELETE FROM task_canvas.todo
WHERE
  id = sqlc.arg(id)::uuid
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
