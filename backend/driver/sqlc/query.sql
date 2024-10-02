-- name: FindTodo :many
SELECT
  id,
  content,
  completed
FROM
  task_canvas.todo
;

-- name: InsertTodo :exec
INSERT INTO
task_canvas.todo (
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