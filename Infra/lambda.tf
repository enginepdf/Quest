resource "aws_lambda_function" "lambda_tf" {
  filename      = "lambda.zip"
  function_name = "lambda_handler"
  role          = "${aws_iam_role.iam_for_lambda.arn}"

  handler       = "index.handler"  // filename is index
  runtime       = "nodejs12.x"
  
  source_code_hash = "${filebase64sha256("lambda.zip")}"
  depends_on = ["aws_iam_role.iam_for_lambda"]
}

resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"

  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
POLICY
}

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.lambda_tf.arn}"
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.api.execution_arn}/*/*/*"
  depends_on = ["aws_lambda_function.lambda_tf","aws_api_gateway_rest_api.api"]
}

output "lambdafunction-details" {
  value = "${aws_lambda_function.lambda_tf}"
}