-- name: FindTodo :many
SELECT
  id,
  content,
  completed
FROM
  task_canvas.todo
;