resource "aws_alb" "main" {
  name            = "alb"
  subnets         = aws_subnet.*.id
  security_groups = [aws_security_group.lb.id]
  tags = {
      Name = "main alb"
  }
}

resource "aws_alb_target_group" "albtg" {
  name        = "alb-tg"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  health_check {
    healthy_threshold   = "3"
    interval            = "30"
    protocol            = "HTTP"
    matcher             = "200"
    timeout             = "3"
    path                = "/check1"
    unhealthy_threshold = "2"
  }
  tags = {
      Name = "alb-tg"
  }
}

resource "aws_alb_listener" "alb-listener" {
  load_balancer_arn = aws_alb.main.id
  port              = 3000
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_alb_target_group.albtg.id
    type             = "forward"
  }
}