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