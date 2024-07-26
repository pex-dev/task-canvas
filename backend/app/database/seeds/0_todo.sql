insert into task_canvas.todo (id, content, completed) values
  (gen_random_uuid(), '今日の朝ごはんを決める', true),
  (gen_random_uuid(), '今日の昼ごはんを決める', false),
  (gen_random_uuid(), '今日の晩ごはんを決める', false),
  (gen_random_uuid(), '今日のおやつを決める', false),
  (gen_random_uuid(), '今日の運動を決める', false),
  (gen_random_uuid(), '今日の読書を決める', false);