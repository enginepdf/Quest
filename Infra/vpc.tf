resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  instance_tenancy     = "default"
  enable_dns_support   = "true"
  enable_dns_hostnames = "true"
  tags = {
    Name = "main vpc"
  }
}

resource "aws_subnet" "main-public-sn1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"  
  map_public_ip_on_launch = "true"
  availability_zone       = "ap-northeast-2a" 

  tags = {
    Name = "main-public-sn1"
  }
}

resource "aws_subnet" "main-public-sn2" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"  
  map_public_ip_on_launch = "true"
  availability_zone       = "ap-northeast-2b" 

  tags = {
    Name = "main-public-sn2"
  }
}

resource "aws_internet_gateway" "main-gw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "main_gw"
  }
}

resource "aws_route_table" "main-public-rt" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main-gw.id
  }

  tags = {
    Name = "main-public-rt"
  }
}

resource "aws_route_table_association" "vpc1-public-association" {
  subnet_id      = aws_subnet.main-public-sn1.id
  route_table_id = aws_route_table.main-public-rt.id
}