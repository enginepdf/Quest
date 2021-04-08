resource "aws_s3_bucket" "b" {
  bucket = "${var.bucket}"
  acl    = "private"

  tags = {
    Name = "${var.bucket}"
  }
}

locals {
  s3_origin_id = "myS3Origin"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.b.bucket_regional_domain_name
    origin_id   = local.s3_origin_id

    s3_origin_config {
      origin_access_identity = "origin-access-identity/cloudfront/ABCDEFG1234567"
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = ""
  default_root_object = "index.html"

  tags = {
    Environment = "developement"
  }

  viewer_certificate {
    acm_certificate_arn ="${var.crtARN}"  // acm_certificate_arn or iam_certificate_id
  }
}