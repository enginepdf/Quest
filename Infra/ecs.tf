# ecs.tf

resource "aws_ecs_cluster" "quest" {
  name = "quest-cluster"
  tags = {
      Name = "ecs_quest"
  }
  
}

data "template_file" "web-app" {
  template = file("./web_app.json.tpl")

  vars = {
    app_image      = "dockerdap12/quest:3.0"
    app_port       = 3000
    fargate_cpu    = 1000
    fargate_memory = 500
    aws_region     = "ap-northeast-2"
  }

}

resource "aws_ecs_task_definition" "app" {
  family                   = "quest-task"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 1000
  memory                   = 500
  container_definitions    = data.template_file.web-app.rendered

  depends_on = [aws_cloudwatch_log_stream.web_app_log_stream]
}

resource "aws_ecs_service" "main" {
  name            = "quest-service"
  cluster         = aws_ecs_cluster.quest.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = var.app_count
  launch_type     = "FARGATE"

  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id]
    subnets          = aws_subnet.*.id
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.albtg.id
    container_name   = "quest"
    container_port   = 3000
  }

  depends_on = [aws_alb_listener.front_end, aws_iam_role_policy_attachment.ecs_task_execution_role]
}